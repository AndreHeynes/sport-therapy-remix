
-- Create articles table with bilingual content
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_sk TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_sk TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  content_sk TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  category_sk TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  read_time_sk TEXT NOT NULL DEFAULT '',
  read_time_en TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '📝',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Anyone can read published articles"
  ON public.articles FOR SELECT
  USING (published = true);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin policies for articles
CREATE POLICY "Admins can read all articles"
  ON public.articles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update articles"
  ON public.articles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial articles
INSERT INTO public.articles (slug, title_sk, title_en, excerpt_sk, excerpt_en, content_sk, content_en, category_sk, category_en, read_time_sk, read_time_en, image, published) VALUES
('back-pain-exercises', '3 jednoduché cviky na bolesť krížov', '3 Simple Exercises for Lower Back Pain', 'Naučte sa základné cviky, ktoré môžete robiť doma na úľavu od bolesti krížov.', 'Learn basic exercises you can do at home to relieve lower back pain.', '<p>Bolesť krížov je jedným z najčastejších problémov, s ktorými sa stretávame. Tu sú tri jednoduché cviky:</p><h3>1. Mačka-Krava</h3><p>Kľaknite si na štyri a striedavo vyhrbte a prehýbajte chrbát. Opakujte 10-krát.</p><h3>2. Mostík</h3><p>Ľahnite si na chrbát, pokrčte kolená a zdvíhajte panvu. Držte 5 sekúnd, opakujte 10-krát.</p><h3>3. Kolenový ťah</h3><p>Ľahnite na chrbát a priťahujte kolená k hrudníku. Držte 20 sekúnd na každej strane.</p>', '<p>Lower back pain is one of the most common issues we see. Here are three simple exercises:</p><h3>1. Cat-Cow</h3><p>Get on all fours and alternate between arching and rounding your back. Repeat 10 times.</p><h3>2. Bridge</h3><p>Lie on your back, bend your knees and lift your pelvis. Hold for 5 seconds, repeat 10 times.</p><h3>3. Knee Pull</h3><p>Lie on your back and pull your knees to your chest. Hold 20 seconds on each side.</p>', 'Cvičenia', 'Exercises', '5 min čítania', '5 min read', '🧘‍♀️', true),
('understanding-sciatica', 'Porozumenie ischiasu: Čo potrebujete vedieť', 'Understanding Sciatica: What You Need to Know', 'Ischias môže byť bolestivý a obmedzujúci. Dozviete sa o príčinách a liečbe.', 'Sciatica can be painful and limiting. Learn about causes and treatment.', '<p>Ischias je bolesť, ktorá vyžaruje pozdĺž sedacieho nervu. Príčiny zahŕňajú herniu disku, stenózu chrbtice a syndróm piriformis.</p><p>Liečba zahŕňa fyzioterapiu, cvičenia a v niektorých prípadoch medikáciu.</p>', '<p>Sciatica is pain that radiates along the sciatic nerve. Causes include disc herniation, spinal stenosis, and piriformis syndrome.</p><p>Treatment includes physiotherapy, exercises, and in some cases medication.</p>', 'Zdravie', 'Health', '7 min čítania', '7 min read', '🦴', true),
('headache-management', 'Ako zvládať bolesti hlavy bez liekov', 'How to Manage Headaches Without Medication', 'Objavte prirodzené spôsoby úľavy od bolesti hlavy.', 'Discover natural ways to relieve headaches.', '<p>Manuálna terapia, relaxačné techniky a úprava životného štýlu môžu výrazne pomôcť pri zvládaní bolestí hlavy.</p>', '<p>Manual therapy, relaxation techniques, and lifestyle changes can significantly help manage headaches.</p>', 'Wellness', 'Wellness', '6 min čítania', '6 min read', '🧠', true),
('sports-injury-prevention', 'Prevencia športových zranení', 'Sports Injury Prevention', 'Tipy a stratégie pre športovcov na predchádzanie zraneniam.', 'Tips and strategies for athletes to prevent injuries.', '<p>Správne rozcvičenie, posilňovacie cvičenia a technika sú kľúčom k prevencii športových zranení.</p>', '<p>Proper warm-up, strengthening exercises, and technique are key to preventing sports injuries.</p>', 'Šport', 'Sports', '8 min čítania', '8 min read', '⚽', true);

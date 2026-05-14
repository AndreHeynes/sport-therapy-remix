import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Globe, Award, Heart } from 'lucide-react';

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      pageTitle: 'About André Heynes',
      metaDesc: 'Learn about André Heynes — over 25 years of international physiotherapy experience across South Africa, UK, UAE, and Slovakia.',
      heroSubtitle: 'BSc Physiotherapy • PGDip Sports Physiotherapy • MSc Physiotherapy',
      intro: 'With over two decades of international experience, André Heynes brings a global perspective to patient care.',
      paragraphs: [
        'André graduated with a BSc in Physiotherapy in 2000 in South Africa, beginning his career at Livingstone Hospital in Port Elizabeth. It was here that he built a robust clinical foundation, rotating through intensive care, pediatrics, orthopedics, and cardio-thoracic surgery.',
        'His pursuit of excellence led him to the United Kingdom, where he spent several years refining his expertise in Musculoskeletal (MSK) and Sports Injury Management. During this time, he held diverse roles within Government and Private hospitals, as well as the Royal Air Force, focusing on high-performance rehabilitation and a swift return to function. This was followed by eight years in the U.A.E., where he continued to specialize in MSK health and sports management.',
        'André is a lifelong learner, holding a Post-Graduate Diploma in Sports Physiotherapy from the University of Bath (UK) and a Master\'s in Physiotherapy from Stellenbosch University (RSA). While he is highly skilled in treating complex sports injuries and neural dysfunctions, he has developed a deep clinical interest in the specialized treatment of headache disorders—an area of practice he finds particularly rewarding due to the profound impact it has on a patient\'s quality of life.',
        'Having treated patients across the globe, André recognizes that while two people may share a diagnosis, they never share the same needs. He prides himself on adapting his practice to the individual, combining the latest clinical evidence with a personal touch to design programs that truly resonate with each person\'s goals.',
      ],
      qualificationsTitle: 'Qualifications',
      qualifications: [
        'BSc Physiotherapy — South Africa (2000)',
        'PGDip Sports Physiotherapy — University of Bath, UK',
        'MSc Physiotherapy — Stellenbosch University, RSA',
      ],
      journeyTitle: 'International Journey',
      countries: [
        { flag: '🇿🇦', name: 'South Africa', detail: 'Clinical foundation at Livingstone Hospital' },
        { flag: '🇬🇧', name: 'United Kingdom', detail: 'MSK & Sports Injury — NHS, Private & Royal Air Force' },
        { flag: '🇦🇪', name: 'United Arab Emirates', detail: '8 years specializing in MSK & sports management' },
        { flag: '🇸🇰', name: 'Slovakia', detail: 'Current practice in Dubnica nad Váhom' },
      ],
      specialInterestsTitle: 'Special Interests',
      specialInterests: [
        'Complex sports injuries',
        'Neural dysfunctions',
        'Headache disorder treatment',
        'High-performance rehabilitation',
      ],
      philosophyTitle: 'Treatment Philosophy',
      philosophy: 'While two people may share a diagnosis, they never share the same needs. I combine the latest clinical evidence with a personal touch to design programs that truly resonate with each person\'s goals.',
      ctaText: 'Book a Consultation',
    },
    sk: {
      pageTitle: 'O André Heynesovi',
      metaDesc: 'Zistite viac o André Heynesovi — viac ako 25 rokov medzinárodných skúseností vo fyzioterapii v Južnej Afrike, Veľkej Británii, SAE a na Slovensku.',
      heroSubtitle: 'BSc Fyzioterapia • PGDip Športová fyzioterapia • MSc Fyzioterapia',
      intro: 'S viac ako dvoma desaťročiami medzinárodných skúseností prináša André Heynes globálny pohľad na starostlivosť o pacienta.',
      paragraphs: [
        'André ukončil štúdium BSc v odbore Fyzioterapia v roku 2000 v Južnej Afrike a svoju kariéru začal v nemocnici Livingstone v Port Elizabeth. Práve tu si vybudoval robustný klinický základ rotáciami cez jednotky intenzívnej starostlivosti, pediatriu, ortopédiu a kardio-torakálnu chirurgiu.',
        'Jeho snaha o dokonalosť ho priviedla do Veľkej Británie, kde strávil niekoľko rokov zdokonaľovaním svojich odborných znalostí v oblasti muskuloskeletálnej (MSK) a športovej traumatológie. Počas tohto obdobia zastával rôzne pozície v štátnych a súkromných nemocniciach, ako aj v Kráľovskom letectve, so zameraním na vysokovýkonnú rehabilitáciu a rýchly návrat k funkcii. Nasledovalo osem rokov v SAE, kde sa naďalej špecializoval na MSK zdravie a športový manažment.',
        'André je celoživotný študent, ktorý je držiteľom postgraduálneho diplomu v športovej fyzioterapii z University of Bath (UK) a magisterského titulu vo fyzioterapii zo Stellenbosch University (RSA). Hoci je vysoko kvalifikovaný v liečbe komplexných športových zranení a neurálnych dysfunkcií, vyvinul hlboký klinický záujem o špecializovanú liečbu porúch bolesti hlavy — oblasť praxe, ktorú považuje za obzvlášť prínosnú pre zásadný vplyv na kvalitu života pacienta.',
        'Po liečbe pacientov po celom svete André uznáva, že hoci dvaja ľudia môžu zdieľať diagnózu, nikdy nezdieľajú rovnaké potreby. Je hrdý na to, že svoju prax prispôsobuje jednotlivcovi, kombinujúc najnovšie klinické dôkazy s osobným prístupom na navrhovanie programov, ktoré skutočne rezonujú s cieľmi každej osoby.',
      ],
      qualificationsTitle: 'Kvalifikácie',
      qualifications: [
        'BSc Fyzioterapia — Južná Afrika (2000)',
        'PGDip Športová fyzioterapia — University of Bath, UK',
        'MSc Fyzioterapia — Stellenbosch University, RSA',
      ],
      journeyTitle: 'Medzinárodná cesta',
      countries: [
        { flag: '🇿🇦', name: 'Južná Afrika', detail: 'Klinický základ v nemocnici Livingstone' },
        { flag: '🇬🇧', name: 'Veľká Británia', detail: 'MSK a športové zranenia — NHS, súkromné nemocnice a RAF' },
        { flag: '🇦🇪', name: 'Spojené arabské emiráty', detail: '8 rokov špecializácie na MSK a športový manažment' },
        { flag: '🇸🇰', name: 'Slovensko', detail: 'Aktuálna prax v Dubnici nad Váhom' },
      ],
      specialInterestsTitle: 'Špeciálne záujmy',
      specialInterests: [
        'Komplexné športové zranenia',
        'Neurálne dysfunkcie',
        'Liečba porúch bolesti hlavy',
        'Vysokovýkonná rehabilitácia',
      ],
      philosophyTitle: 'Filozofia liečby',
      philosophy: 'Hoci dvaja ľudia môžu zdieľať diagnózu, nikdy nezdieľajú rovnaké potreby. Kombinujem najnovšie klinické dôkazy s osobným prístupom na navrhovanie programov, ktoré skutočne rezonujú s cieľmi každej osoby.',
      ctaText: 'Objednajte sa na konzultáciu',
    },
  };

  const c = content[language];

  return (
    <HelmetProvider>
      <SEO
        title={c.pageTitle}
        description={c.metaDesc}
        canonical="https://sportandbodyterapia.org/about"
      />
      <div className="min-h-screen bg-background font-body">
        <Header />
        <main>
          {/* Hero */}
          <section className="bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white py-20">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-5xl">👨‍⚕️</div>
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">André Heynes</h1>
              <p className="text-white/80 text-lg mb-4">{c.heroSubtitle}</p>
              <p className="text-xl text-white/90 leading-relaxed">{c.intro}</p>
            </div>
          </section>

          {/* Bio */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl space-y-6">
              {c.paragraphs.map((p, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </section>

          {/* Cards row */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Qualifications */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="text-brand-teal" size={28} />
                  <h2 className="text-2xl font-heading font-bold text-foreground">{c.qualificationsTitle}</h2>
                </div>
                <ul className="space-y-3">
                  {c.qualifications.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <Award className="text-brand-teal mt-1 shrink-0" size={16} />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Special Interests */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="text-brand-teal" size={28} />
                  <h2 className="text-2xl font-heading font-bold text-foreground">{c.specialInterestsTitle}</h2>
                </div>
                <ul className="space-y-3">
                  {c.specialInterests.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-brand-teal mt-1">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </section>

          {/* International Journey */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex items-center gap-3 mb-10 justify-center">
                <Globe className="text-brand-teal" size={28} />
                <h2 className="text-3xl font-heading font-bold text-foreground">{c.journeyTitle}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {c.countries.map((country, i) => (
                  <Card key={i} className="p-6 text-center floating-card">
                    <div className="text-4xl mb-3">{country.flag}</div>
                    <h3 className="font-heading font-bold text-foreground mb-1">{country.name}</h3>
                    <p className="text-sm text-muted-foreground">{country.detail}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy Quote */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">{c.philosophyTitle}</h2>
              <blockquote className="text-xl text-muted-foreground italic leading-relaxed border-l-4 border-brand-teal pl-6 text-left">
                "{c.philosophy}"
              </blockquote>
              <Button
                size="lg"
                className="mt-10 btn-shine text-white font-semibold px-8 py-4 shadow-floating hover:shadow-glow-lg transition-all duration-300"
                onClick={() => window.location.href = '/#contact'}
              >
                {c.ctaText}
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default About;

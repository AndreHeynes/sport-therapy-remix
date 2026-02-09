import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const articles: Record<string, { sk: { title: string; content: string }; en: { title: string; content: string }; image: string }> = {
  'back-pain-exercises': {
    sk: {
      title: '3 jednoduché cviky na bolesť krížov',
      content: '<p>Bolesť krížov je jedným z najčastejších problémov, s ktorými sa stretávame. Tu sú tri jednoduché cviky:</p><h3>1. Mačka-Krava</h3><p>Kľaknite si na štyri a striedavo vyhrbte a prehýbajte chrbát. Opakujte 10-krát.</p><h3>2. Mostík</h3><p>Ľahnite si na chrbát, pokrčte kolená a zdvíhajte panvu. Držte 5 sekúnd, opakujte 10-krát.</p><h3>3. Kolenový ťah</h3><p>Ľahnite na chrbát a priťahujte kolená k hrudníku. Držte 20 sekúnd na každej strane.</p>'
    },
    en: {
      title: '3 Simple Exercises for Lower Back Pain',
      content: '<p>Lower back pain is one of the most common issues we see. Here are three simple exercises:</p><h3>1. Cat-Cow</h3><p>Get on all fours and alternate between arching and rounding your back. Repeat 10 times.</p><h3>2. Bridge</h3><p>Lie on your back, bend your knees and lift your pelvis. Hold for 5 seconds, repeat 10 times.</p><h3>3. Knee Pull</h3><p>Lie on your back and pull your knees to your chest. Hold 20 seconds on each side.</p>'
    },
    image: '🧘‍♀️'
  },
  'understanding-sciatica': {
    sk: {
      title: 'Porozumenie ischiasu: Čo potrebujete vedieť',
      content: '<p>Ischias je bolesť, ktorá vyžaruje pozdĺž sedacieho nervu. Príčiny zahŕňajú herniu disku, stenózu chrbtice a syndróm piriformis.</p><p>Liečba zahŕňa fyzioterapiu, cvičenia a v niektorých prípadoch medikáciu.</p>'
    },
    en: {
      title: 'Understanding Sciatica: What You Need to Know',
      content: '<p>Sciatica is pain that radiates along the sciatic nerve. Causes include disc herniation, spinal stenosis, and piriformis syndrome.</p><p>Treatment includes physiotherapy, exercises, and in some cases medication.</p>'
    },
    image: '🦴'
  },
  'headache-management': {
    sk: {
      title: 'Ako zvládať bolesti hlavy bez liekov',
      content: '<p>Manuálna terapia, relaxačné techniky a úprava životného štýlu môžu výrazne pomôcť pri zvládaní bolestí hlavy.</p>'
    },
    en: {
      title: 'How to Manage Headaches Without Medication',
      content: '<p>Manual therapy, relaxation techniques, and lifestyle changes can significantly help manage headaches.</p>'
    },
    image: '🧠'
  },
  'sports-injury-prevention': {
    sk: {
      title: 'Prevencia športových zranení',
      content: '<p>Správne rozcvičenie, posilňovacie cvičenia a technika sú kľúčom k prevencii športových zranení.</p>'
    },
    en: {
      title: 'Sports Injury Prevention',
      content: '<p>Proper warm-up, strengthening exercises, and technique are key to preventing sports injuries.</p>'
    },
    image: '⚽'
  }
};

const Article = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const article = articleId ? articles[articleId] : null;

  if (!article) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white font-body">
          <Header />
          <main className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">Article not found</h1>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  const content = article[language];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white font-body">
        <SEO title={content.title} />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6 text-brand-teal">
              <ArrowLeft className="mr-2" size={16} />
              {language === 'sk' ? 'Späť' : 'Back'}
            </Button>
            <div className="text-6xl mb-6">{article.image}</div>
            <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-8">{content.title}</h1>
            <Card className="shadow-lg">
              <CardContent className="p-8 prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Article;

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
import { useArticleBySlug } from '@/hooks/useArticles';

const Article = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(articleId);

  if (isLoading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white font-body">
          <Header />
          <main className="container mx-auto px-4 py-20 text-center">
            <p className="text-gray-500">{language === 'sk' ? 'Načítava sa...' : 'Loading...'}</p>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  if (!article || error) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white font-body">
          <Header />
          <main className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">
              {language === 'sk' ? 'Článok nenájdený' : 'Article not found'}
            </h1>
            <Button onClick={() => navigate('/')}>
              {language === 'sk' ? 'Domov' : 'Go Home'}
            </Button>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  const title = language === 'sk' ? article.title_sk : article.title_en;
  const content = language === 'sk' ? article.content_sk : article.content_en;

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white font-body">
        <SEO title={title} />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-6 text-brand-teal">
              <ArrowLeft className="mr-2" size={16} />
              {language === 'sk' ? 'Späť' : 'Back'}
            </Button>
            <div className="text-6xl mb-6">{article.image}</div>
            <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-8">{title}</h1>
            <Card className="shadow-lg">
              <CardContent className="p-8 prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Article;

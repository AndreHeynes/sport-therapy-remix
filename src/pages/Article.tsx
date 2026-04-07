import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Clock } from 'lucide-react';
import DOMPurify from 'dompurify';
import { useArticleBySlug } from '@/hooks/useArticles';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';

const Article = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(articleId);

  if (isLoading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-background font-body">
          <Header />
          <main className="container mx-auto px-4 py-20 text-center">
            <p className="text-muted-foreground">{language === 'sk' ? 'Načítava sa...' : 'Loading...'}</p>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  if (!article || error) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-background font-body">
          <Header />
          <main className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">
              {language === 'sk' ? 'Článok nenájdený' : 'Article not found'}
            </h1>
            <Button onClick={() => navigate('/blog')}>
              {language === 'sk' ? 'Späť na blog' : 'Back to Blog'}
            </Button>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  const title = language === 'sk' ? article.title_sk : article.title_en;
  const excerpt = language === 'sk' ? article.excerpt_sk : article.excerpt_en;
  const content = language === 'sk' ? article.content_sk : article.content_en;
  const category = language === 'sk' ? article.category_sk : article.category_en;
  const readTime = language === 'sk' ? article.read_time_sk : article.read_time_en;
  const articleUrl = `https://sportandbodyterapia.org/article/${article.slug}`;

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background font-body">
        <SEO
          title={title}
          description={excerpt}
          canonical={articleUrl}
          type="article"
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-6 text-brand-teal">
              <ArrowLeft className="mr-2" size={16} />
              {language === 'sk' ? 'Späť na blog' : 'Back to Blog'}
            </Button>
            <div className="text-6xl mb-6">{article.image}</div>
            <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span className="font-semibold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={14} />
                {format(new Date(article.created_at), 'd MMM yyyy', {
                  locale: language === 'sk' ? sk : undefined,
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {readTime}
              </span>
            </div>
            <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-8">{title}</h1>
            <Card className="shadow-lg">
              <CardContent className="p-8 prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'br', 'img', 'blockquote', 'pre', 'code', 'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td'], ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'width', 'height'] }) }} />
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Article;

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePublishedArticles } from '@/hooks/useArticles';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { CalendarDays, Clock } from 'lucide-react';

const Blog = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { data: articles, isLoading } = usePublishedArticles();

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background font-body">
        <SEO
          title={language === 'sk' ? 'Blog' : 'Blog'}
          description={language === 'sk' ? 'Články a zdroje pre pacientov' : 'Articles and patient resources'}
          canonical="https://sportandbodyterapia.org/blog"
        />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal mb-4">
              {t('resources.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('resources.subtitle')}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              {language === 'sk' ? 'Načítava sa...' : 'Loading...'}
            </div>
          ) : !articles?.length ? (
            <div className="text-center py-8 text-muted-foreground">
              {language === 'sk' ? 'Zatiaľ žiadne články.' : 'No articles yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/article/${article.slug}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {article.image}
                      </span>
                      <span className="text-xs font-semibold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">
                        {language === 'sk' ? article.category_sk : article.category_en}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-heading font-semibold text-brand-charcoal group-hover:text-brand-teal transition-colors duration-300">
                      {language === 'sk' ? article.title_sk : article.title_en}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {language === 'sk' ? article.excerpt_sk : article.excerpt_en}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {format(new Date(article.created_at), 'd MMM yyyy', {
                          locale: language === 'sk' ? sk : undefined,
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {language === 'sk' ? article.read_time_sk : article.read_time_en}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Blog;

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, CalendarDays, Clock, ChevronDown, BookOpen } from 'lucide-react';
import DOMPurify from 'dompurify';
import { useArticleBySlug } from '@/hooks/useArticles';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import ArticleShareButtons from '@/components/ArticleShareButtons';

const Article = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(articleId);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sanitizedContent = useMemo(() => {
    if (!article) return '';
    const raw = language === 'sk' ? article.content_sk : article.content_en;
    return DOMPurify.sanitize(raw, {
      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'strong', 'em', 'br', 'img', 'blockquote', 'pre', 'code', 'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel', 'width', 'height'],
    });
  }, [article, language]);

  const tocItems = useMemo(() => {
    const matches = sanitizedContent.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi);
    return Array.from(matches).map((m, i) => ({
      id: `section-${i}`,
      text: m[1].replace(/<[^>]*>/g, ''),
    }));
  }, [sanitizedContent]);

  const contentWithIds = useMemo(() => {
    let index = 0;
    return sanitizedContent.replace(/<h2([^>]*)>/gi, () => {
      const id = `section-${index}`;
      index++;
      return `<h2 id="${id}"`;
    });
  }, [sanitizedContent]);

  if (isLoading) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-background font-body">
          <Header />
          <main className="container mx-auto px-4 py-20 text-center">
            <div className="animate-pulse space-y-4 max-w-2xl mx-auto">
              <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              <div className="h-64 bg-muted rounded" />
            </div>
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
  const category = language === 'sk' ? article.category_sk : article.category_en;
  const readTime = language === 'sk' ? article.read_time_sk : article.read_time_en;
  const articleUrl = `https://sportandbodyterapia.org/article/${article.slug}`;
  const ogImage = article.image && article.image.startsWith('/')
    ? `https://sportandbodyterapia.org${article.image}`
    : undefined;

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-background font-body">
        <SEO
          title={title}
          description={excerpt}
          canonical={articleUrl}
          type="article"
          ogImage={ogImage}
        />

        {/* Reading progress bar */}
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <Progress value={scrollProgress} className="h-1 rounded-none bg-transparent [&>div]:bg-brand-teal" />
        </div>

        <Header />

        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-charcoal text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          </div>
          <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2" size={16} />
              {language === 'sk' ? 'Späť na blog' : 'Back to Blog'}
            </Button>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {category}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white/80">
                  <BookOpen size={12} className="mr-1" />
                  {language === 'sk' ? 'Blog 1 z 5' : 'Blog 1 of 5'}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  {format(new Date(article.created_at), 'd MMM yyyy', {
                    locale: language === 'sk' ? sk : undefined,
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        <main className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt highlight */}
            <div className="border-l-4 border-brand-teal bg-brand-teal/5 rounded-r-lg p-5 mb-10">
              <p className="text-brand-charcoal/80 text-lg leading-relaxed italic font-body">
                {excerpt}
              </p>
            </div>

            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-10">
                <CollapsibleTrigger className="flex items-center gap-2 w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left">
                  <BookOpen size={18} className="text-brand-teal" />
                  <span className="font-heading font-semibold text-brand-charcoal">
                    {language === 'sk' ? 'Obsah článku' : 'Table of Contents'}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`ml-auto text-brand-charcoal/50 transition-transform ${tocOpen ? 'rotate-180' : ''}`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <nav className="p-4 space-y-2">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm text-brand-charcoal/70 hover:text-brand-teal transition-colors pl-4 border-l-2 border-transparent hover:border-brand-teal py-1"
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Article content */}
            <article
              className="article-prose prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Divider */}
            <hr className="my-12 border-brand-teal/20" />

            {/* Share buttons */}
            <ArticleShareButtons url={articleUrl} title={title} />

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-r from-brand-teal/10 to-brand-teal-light/10 rounded-xl p-8 text-center">
              <h3 className="text-xl font-heading font-bold text-brand-charcoal mb-2">
                {language === 'sk'
                  ? 'Potrebujete pomoc s bolesťou?'
                  : 'Need help with pain?'}
              </h3>
              <p className="text-brand-charcoal/70 mb-4">
                {language === 'sk'
                  ? 'Objednajte sa na konzultáciu s naším fyzioterapeutom.'
                  : 'Book a consultation with our physiotherapist.'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => navigate('/#contact')}
                  className="bg-brand-teal hover:bg-brand-teal-dark text-white"
                >
                  {language === 'sk' ? 'Objednať sa' : 'Book appointment'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/blog')}
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal/10"
                >
                  {language === 'sk' ? 'Ďalšie články' : 'More articles'}
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default Article;

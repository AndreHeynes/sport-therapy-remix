import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255)
});

const PatientResourcesSection = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const articles = [
    {
      id: 'back-pain-exercises',
      title: language === 'sk' ? "3 jednoduché cviky na bolesť krížov" : "3 Simple Exercises for Lower Back Pain",
      excerpt: language === 'sk' ? "Naučte sa základné cviky, ktoré môžete robiť doma na úľavu od bolesti krížov." : "Learn basic exercises you can do at home to relieve lower back pain.",
      readTime: language === 'sk' ? "5 min čítania" : "5 min read",
      category: language === 'sk' ? "Cvičenia" : "Exercises",
      image: "🧘‍♀️"
    },
    {
      id: 'understanding-sciatica',
      title: language === 'sk' ? "Porozumenie ischiasu: Čo potrebujete vedieť" : "Understanding Sciatica: What You Need to Know",
      excerpt: language === 'sk' ? "Ischias môže byť bolestivý a obmedzujúci. Dozviete sa o príčinách a liečbe." : "Sciatica can be painful and limiting. Learn about causes and treatment.",
      readTime: language === 'sk' ? "7 min čítania" : "7 min read",
      category: language === 'sk' ? "Zdravie" : "Health",
      image: "🦴"
    },
    {
      id: 'headache-management',
      title: language === 'sk' ? "Ako zvládať bolesti hlavy bez liekov" : "How to Manage Headaches Without Medication",
      excerpt: language === 'sk' ? "Objavte prirodzené spôsoby úľavy od bolesti hlavy." : "Discover natural ways to relieve headaches.",
      readTime: language === 'sk' ? "6 min čítania" : "6 min read",
      category: language === 'sk' ? "Wellness" : "Wellness",
      image: "🧠"
    },
    {
      id: 'sports-injury-prevention',
      title: language === 'sk' ? "Prevencia športových zranení" : "Sports Injury Prevention",
      excerpt: language === 'sk' ? "Tipy a stratégie pre športovcov na predchádzanie zraneniam." : "Tips and strategies for athletes to prevent injuries.",
      readTime: language === 'sk' ? "8 min čítania" : "8 min read",
      category: language === 'sk' ? "Šport" : "Sports",
      image: "⚽"
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    setIsSubscribing(true);

    try {
      const validatedData = newsletterSchema.parse({ email: newsletterEmail });
      const subject = encodeURIComponent('Newsletter Subscription Request');
      const body = encodeURIComponent(`Please add this email to the newsletter list:\n\n${validatedData.email}`);
      window.location.href = `mailto:info@sportbodyterapia.sk?subject=${subject}&body=${body}`;
      toast({
        title: language === 'sk' ? 'Ďakujeme!' : 'Thank you!',
        description: language === 'sk' ? 'Váš e-mail bol zaznamenaný.' : 'Your email has been recorded.',
      });
      setNewsletterEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setNewsletterError(error.errors[0].message);
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal mb-6">
            {t('resources.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('resources.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{article.image}</span>
                  <span className="text-xs font-semibold text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">{article.category}</span>
                </div>
                <CardTitle className="text-xl font-heading font-semibold text-brand-charcoal group-hover:text-brand-teal transition-colors duration-300">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                  <Button variant="outline" size="sm" className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300">
                    {t('resources.read-more')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-brand-teal to-brand-teal-dark text-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-heading font-bold mb-4">{t('resources.newsletter.title')}</h3>
              <p className="text-white/90 mb-6">{t('resources.newsletter.subtitle')}</p>
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder={t('resources.newsletter.email')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 ${newsletterError ? 'border-2 border-red-500' : ''}`}
                    maxLength={255}
                    required
                  />
                  <Button type="submit" disabled={isSubscribing} className="bg-white text-brand-teal hover:bg-gray-100 font-semibold px-6 py-3">
                    {isSubscribing ? '...' : t('resources.newsletter.subscribe')}
                  </Button>
                </div>
                {newsletterError && <p className="text-white text-sm mt-2 bg-red-500/20 px-3 py-2 rounded">{newsletterError}</p>}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PatientResourcesSection;

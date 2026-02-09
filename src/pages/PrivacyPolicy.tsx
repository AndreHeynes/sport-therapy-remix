import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, Database, Share2, Clock, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  const sections = [
    { icon: Database, title: t('privacy.data-collection.title'), content: t('privacy.data-collection.content') },
    { icon: Eye, title: t('privacy.data-usage.title'), content: t('privacy.data-usage.content') },
    { icon: Share2, title: t('privacy.data-sharing.title'), content: t('privacy.data-sharing.content') },
    { icon: Lock, title: t('privacy.data-security.title'), content: t('privacy.data-security.content') },
    { icon: Clock, title: t('privacy.data-retention.title'), content: t('privacy.data-retention.content') },
    { icon: AlertCircle, title: t('privacy.cookies.title'), content: t('privacy.cookies.content') }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-body">
        <SEO title={t('privacy.title')} description={t('privacy.description')} />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-6">
                <Lock className="text-brand-teal" size={32} />
              </div>
              <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">{t('privacy.title')}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t('privacy.subtitle')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('privacy.last-updated')}: 26. júna 2024</p>
            </div>
            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index} className="floating-card glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <section.icon className="text-brand-teal" size={24} />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default PrivacyPolicy;

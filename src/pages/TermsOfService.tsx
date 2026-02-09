import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Users, AlertTriangle, RefreshCw } from 'lucide-react';

const TermsOfService = () => {
  const { t } = useLanguage();

  const sections = [
    { icon: FileText, title: t('terms.acceptance.title'), content: t('terms.acceptance.content') },
    { icon: Briefcase, title: t('terms.services.title'), content: t('terms.services.content') },
    { icon: Users, title: t('terms.responsibilities.title'), content: t('terms.responsibilities.content') },
    { icon: AlertTriangle, title: t('terms.liability.title'), content: t('terms.liability.content') },
    { icon: RefreshCw, title: t('terms.modifications.title'), content: t('terms.modifications.content') },
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-body">
        <SEO title={t('terms.title')} description={t('terms.description')} />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-6">
                <FileText className="text-brand-teal" size={32} />
              </div>
              <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">{t('terms.title')}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t('terms.subtitle')}</p>
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

export default TermsOfService;

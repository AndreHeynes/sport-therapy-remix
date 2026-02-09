import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Stethoscope, Phone, FileText, Users } from 'lucide-react';

const MedicalDisclaimer = () => {
  const { t } = useLanguage();

  const sections = [
    { icon: AlertTriangle, title: t('medical.disclaimer.title'), content: t('medical.disclaimer.content') },
    { icon: Stethoscope, title: t('medical.professional-relationship.title'), content: t('medical.professional-relationship.content') },
    { icon: Phone, title: t('medical.emergency.title'), content: t('medical.emergency.content') },
    { icon: FileText, title: t('medical.treatment-results.title'), content: t('medical.treatment-results.content') },
    { icon: Users, title: t('medical.individual-assessment.title'), content: t('medical.individual-assessment.content') }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-body">
        <SEO title={t('medical.title')} description={t('medical.description')} />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <AlertTriangle className="text-red-600" size={32} />
              </div>
              <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">{t('medical.title')}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t('medical.subtitle')}</p>
            </div>
            <Card className="floating-card bg-red-50 border-red-200 mb-8">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">{t('medical.important-notice.title')}</h3>
                    <p className="text-red-700">{t('medical.important-notice.content')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default MedicalDisclaimer;

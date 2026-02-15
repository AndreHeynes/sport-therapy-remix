import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Database, FileText, Mail, Phone } from 'lucide-react';

const GDPRCompliance = () => {
  const { t } = useLanguage();

  const sections = [
    { icon: Users, title: t('gdpr.data-controller.title'), content: t('gdpr.data-controller.content') },
    { icon: Database, title: t('gdpr.data-collected.title'), content: t('gdpr.data-collected.content') },
    { icon: Shield, title: t('gdpr.legal-basis.title'), content: t('gdpr.legal-basis.content') },
    { icon: FileText, title: t('gdpr.your-rights.title'), content: t('gdpr.your-rights.content') }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-body">
        <SEO title={t('gdpr.title')} description={t('gdpr.description')} />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-6">
                <Shield className="text-brand-teal" size={32} />
              </div>
              <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">{t('gdpr.title')}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t('gdpr.subtitle')}</p>
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
              <Card className="floating-card glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3"><Mail className="text-brand-teal" size={24} />{t('gdpr.contact.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3"><Mail className="text-brand-teal" size={20} /><span>info@sportandbodyterapia.org</span></div>
                    <div className="flex items-center gap-3"><Phone className="text-brand-teal" size={20} /><span>+421 949 291 013</span></div>
                    <p className="text-gray-600 mt-4">{t('gdpr.contact.description')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default GDPRCompliance;

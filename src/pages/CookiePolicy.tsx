import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Settings, BarChart3, Shield, Trash2, Info } from 'lucide-react';

const CookiePolicy = () => {
  const { t } = useLanguage();

  const cookieTypes = [
    { icon: Shield, title: t('cookies.necessary.title'), content: t('cookies.necessary.content'), color: 'text-green-600' },
    { icon: BarChart3, title: t('cookies.analytics.title'), content: t('cookies.analytics.content'), color: 'text-blue-600' },
    { icon: Settings, title: t('cookies.functional.title'), content: t('cookies.functional.content'), color: 'text-purple-600' }
  ];

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white font-body">
        <SEO title={t('cookies.policy.title')} description={t('cookies.policy.description')} />
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-6">
                <Cookie className="text-brand-teal" size={32} />
              </div>
              <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">{t('cookies.policy.title')}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t('cookies.policy.subtitle')}</p>
            </div>
            <Card className="floating-card glass-card mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><Info className="text-brand-teal" size={24} />{t('cookies.what-are.title')}</CardTitle>
              </CardHeader>
              <CardContent><p className="text-gray-600 leading-relaxed">{t('cookies.what-are.content')}</p></CardContent>
            </Card>
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-heading font-bold text-brand-charcoal">{t('cookies.types.title')}</h2>
              {cookieTypes.map((type, index) => (
                <Card key={index} className="floating-card glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3"><type.icon className={type.color} size={24} />{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: type.content }} />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="floating-card glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><Trash2 className="text-brand-teal" size={24} />{t('cookies.management.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: t('cookies.management.content') }} />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default CookiePolicy;

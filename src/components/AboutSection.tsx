import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  const { t, language } = useLanguage();

  const quote = language === 'sk'
    ? 'Každý pacient má svoju jedinečnú príbeh. Moja úloha je počúvať, porozumieť a vytvoriť liečebný plán, ktorý nie je len efektívny, ale aj udržateľný pre váš životný štýl.'
    : 'Every patient has their own unique story. My role is to listen, understand, and create a treatment plan that is not only effective but also sustainable for your lifestyle.';

  const stats = [
    { value: '25+', label: language === 'sk' ? 'Rokov skúseností' : 'Years Experience' },
    { value: '4', label: language === 'sk' ? 'Krajiny' : 'Countries' },
    { value: '1000+', label: language === 'sk' ? 'Spokojných pacientov' : 'Satisfied Patients' },
    { value: '100%', label: language === 'sk' ? 'Individuálny prístup' : 'Individual Approach' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal mb-4">
                {t('about.title')}
              </h2>
              <p className="text-xl text-brand-teal font-medium">
                {t('about.subtitle')}
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.philosophy')}
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-brand-teal">
                <p className="text-gray-700 italic leading-relaxed">
                  "{quote}"
                </p>
                <p className="text-brand-teal font-medium mt-3">- André Heynes</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                {stats.map((stat) => (
                  <div key={stat.value} className="text-center">
                    <div className="text-2xl font-bold text-brand-teal">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-brand-teal hover:bg-brand-teal-dark text-white font-semibold px-8 py-4"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('about.learn-more')}
            </Button>
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-brand-teal to-brand-teal-dark flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-4xl">👨‍⚕️</div>
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-2">André Heynes</h3>
                  <p className="text-white/90">{language === 'sk' ? 'Registrovaný fyzioterapeut' : 'Registered Physiotherapist'}</p>
                  <div className="mt-6 space-y-2 text-sm">
                    <p>🇿🇦 {language === 'sk' ? 'Južná Afrika' : 'South Africa'} • 🇬🇧 {language === 'sk' ? 'Veľká Británia' : 'United Kingdom'}</p>
                    <p>🇦🇪 {language === 'sk' ? 'Spojené arabské emiráty' : 'United Arab Emirates'} • 🇸🇰 {language === 'sk' ? 'Slovensko' : 'Slovakia'}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="absolute -right-4 top-8 bg-white rounded-lg shadow-lg p-4 border-l-4 border-brand-teal animate-pulse-slow">
              <div className="text-xs font-semibold text-brand-teal">{language === 'sk' ? 'CERTIFIKOVANÝ' : 'CERTIFIED'}</div>
              <div className="text-sm font-medium">{language === 'sk' ? 'Športová rehabilitácia' : 'Sports Rehabilitation'}</div>
            </div>
            
            <div className="absolute -left-4 bottom-8 bg-white rounded-lg shadow-lg p-4 border-l-4 border-brand-teal animate-pulse-slow" style={{ animationDelay: '1s' }}>
              <div className="text-xs font-semibold text-brand-teal">{language === 'sk' ? 'ŠPECIALISTA' : 'SPECIALIST'}</div>
              <div className="text-sm font-medium">{language === 'sk' ? 'Manuálna terapia' : 'Manual Therapy'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

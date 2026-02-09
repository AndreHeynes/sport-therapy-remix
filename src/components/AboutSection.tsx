import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  const { t } = useLanguage();

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
                  "Každý pacient má svoju jedinečnú príbeh. Moja úloha je počúvať, porozumieť a vytvoriť liečebný plán, ktorý nie je len efektívny, ale aj udržateľný pre váš životný štýl."
                </p>
                <p className="text-brand-teal font-medium mt-3">- André Heynes</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-teal">25+</div>
                  <div className="text-sm text-gray-600">Rokov skúseností</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-teal">4</div>
                  <div className="text-sm text-gray-600">Krajiny</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-teal">1000+</div>
                  <div className="text-sm text-gray-600">Spokojných pacientov</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-teal">100%</div>
                  <div className="text-sm text-gray-600">Individuálny prístup</div>
                </div>
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
                  <p className="text-white/90">Registered Physiotherapist</p>
                  <div className="mt-6 space-y-2 text-sm">
                    <p>🇿🇦 South Africa • 🇬🇧 United Kingdom</p>
                    <p>🇦🇪 United Arab Emirates • 🇸🇰 Slovakia</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="absolute -right-4 top-8 bg-white rounded-lg shadow-lg p-4 border-l-4 border-brand-teal animate-pulse-slow">
              <div className="text-xs font-semibold text-brand-teal">CERTIFIED</div>
              <div className="text-sm font-medium">Sports Rehabilitation</div>
            </div>
            
            <div className="absolute -left-4 bottom-8 bg-white rounded-lg shadow-lg p-4 border-l-4 border-brand-teal animate-pulse-slow" style={{ animationDelay: '1s' }}>
              <div className="text-xs font-semibold text-brand-teal">SPECIALIST</div>
              <div className="text-sm font-medium">Manual Therapy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

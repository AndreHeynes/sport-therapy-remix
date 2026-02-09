import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const { t, language } = useLanguage();

  const services = [
    {
      title: t('services.musculoskeletal'),
      description: t('services.musculoskeletal.desc'),
      icon: '🦴',
      gradient: 'from-brand-teal to-brand-teal-dark'
    },
    {
      title: t('services.postop'),
      description: t('services.postop.desc'),
      icon: '🏥',
      gradient: 'from-brand-teal-dark to-brand-teal'
    },
    {
      title: t('services.sports'),
      description: t('services.sports.desc'),
      icon: '⚽',
      gradient: 'from-accent to-brand-teal'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'sk' 
              ? 'Špecializované služby prispôsobené vašim potrebám s dôrazom na individuálny prístup a dlhodobé výsledky.'
              : 'Specialized services tailored to your needs with emphasis on individual approach and long-term results.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-brand-charcoal mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Button 
                  variant="outline" 
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white transition-all duration-300"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {language === 'sk' ? 'Zistiť viac' : 'Learn more'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

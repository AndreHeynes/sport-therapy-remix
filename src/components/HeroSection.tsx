import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t, language } = useLanguage();

  const stats = [
    { value: '25+', label: language === 'sk' ? 'Rokov skúseností' : 'Years Experience' },
    { value: '4', label: language === 'sk' ? 'Krajiny' : 'Countries' },
    { value: '1000+', label: language === 'sk' ? 'Vyliečených pacientov' : 'Patients Treated' },
  ];

  return (
    <section id="home" className="relative bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-teal text-white min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-brand-teal-light/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight animate-fade-in drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          
          <div className="glass-card bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl font-body leading-relaxed text-white/95">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg"
              className="bg-white text-brand-teal hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-floating hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta')}
            </Button>
            <Button 
              size="lg"
              className="btn-glass border-white text-white hover:bg-white/20 font-semibold px-8 py-4 text-lg shadow-glass hover:shadow-glow transition-all duration-300"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('nav.services')}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            {stats.map((stat) => (
              <div key={stat.value} className="glass-card bg-white/5 backdrop-blur-sm border-white/10 text-center floating-card">
                <div className="text-3xl font-bold text-white gradient-text">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-glow-pulse">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

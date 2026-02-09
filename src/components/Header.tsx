import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.resources', href: '#resources' },
    { key: 'nav.contact', href: '#contact' }
  ];

  return (
    <header className="glass-header backdrop-blur-lg bg-white/80 shadow-multi-layer sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-heading font-bold text-brand-charcoal">Šport & Body Terapia</span>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-brand-charcoal hover:text-brand-teal transition-all duration-300 font-medium hover:scale-105 glow-on-hover"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 glass rounded-lg p-1 shadow-glass">
              <button
                onClick={() => setLanguage('sk')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                  language === 'sk'
                    ? 'btn-shine text-white shadow-glow'
                    : 'text-brand-charcoal hover:text-brand-teal hover:bg-white/30'
                }`}
              >
                SK
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                  language === 'en'
                    ? 'btn-shine text-white shadow-glow'
                    : 'text-brand-charcoal hover:text-brand-teal hover:bg-white/30'
                }`}
              >
                EN
              </button>
            </div>

            <Button 
              className="hidden lg:flex btn-shine text-white font-medium px-6 py-2 shadow-floating hover:shadow-glow-lg transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('nav.book')}
            </Button>

            <button
              className="lg:hidden text-brand-charcoal hover:text-brand-teal transition-all duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/20">
            <div className="pt-4 space-y-3 glass-card">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block text-brand-charcoal hover:text-brand-teal transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
              <Button 
                className="w-full mt-4 btn-shine text-white font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('nav.book')}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

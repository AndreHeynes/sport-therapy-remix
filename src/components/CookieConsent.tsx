import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Cookie } from 'lucide-react';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) setIsVisible(true);
  }, []);

  const handleAccept = () => { localStorage.setItem('cookie-consent', 'accepted'); setIsVisible(false); };
  const handleDecline = () => { localStorage.setItem('cookie-consent', 'declined'); setIsVisible(false); };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-fade-in">
      <Card className="glass-card max-w-lg mx-auto">
        <div className="flex items-start gap-3">
          <Cookie className="text-brand-teal mt-1 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-2">{t('cookies.title')}</h3>
            <p className="text-sm text-gray-600 mb-4">{t('cookies.message')}</p>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" onClick={handleAccept} className="btn-shine text-white">{t('cookies.accept')}</Button>
              <Button size="sm" variant="outline" onClick={handleDecline} className="btn-glass">{t('cookies.decline')}</Button>
            </div>
          </div>
          <button onClick={handleDecline} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={16} /></button>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;

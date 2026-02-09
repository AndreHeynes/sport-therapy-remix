import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { createBodyParts } from './InteractiveBodyMap/bodyPartsData';
import BodyDiagram from './InteractiveBodyMap/BodyDiagram';
import ConditionDetails from './InteractiveBodyMap/ConditionDetails';
import QuickStats from './InteractiveBodyMap/QuickStats';

const InteractiveBodyMap = () => {
  const { t, language } = useLanguage();
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const bodyParts = createBodyParts(t, language);
  const selectedBodyPart = bodyParts.find(part => part.id === selectedPart);

  const handlePartClick = (partId: string) => {
    setSelectedPart(selectedPart === partId ? null : partId);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-charcoal mb-6">
            {t('nav.services')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('map.instructions')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <BodyDiagram
            bodyParts={bodyParts}
            selectedPart={selectedPart}
            onPartClick={handlePartClick}
            language={language}
          />

          <div className="space-y-6">
            <ConditionDetails
              selectedBodyPart={selectedBodyPart || null}
              t={t}
              language={language}
            />
            <QuickStats language={language} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveBodyMap;

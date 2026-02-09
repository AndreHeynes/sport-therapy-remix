import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BodyPart } from './bodyPartsData';

interface ConditionDetailsProps {
  selectedBodyPart: BodyPart | null;
  t: (key: string) => string;
  language: string;
}

const ConditionDetails: React.FC<ConditionDetailsProps> = ({ selectedBodyPart, t, language }) => {
  if (!selectedBodyPart) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🏥</div>
          <h3 className="text-xl font-heading font-semibold text-brand-charcoal mb-2">
            {t('map.select-body-part')}
          </h3>
          <p className="text-gray-600">
            {t('map.select-instruction')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-l-4 border-brand-teal">
      <CardHeader>
        <CardTitle className="text-2xl font-heading text-brand-charcoal">
          {selectedBodyPart.name}
        </CardTitle>
        <p className="text-sm text-brand-teal font-medium">{t('map.conditions-title')}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedBodyPart.conditions.map((condition, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-brand-charcoal mb-2">{condition.name}</h4>
            <p className="text-gray-600 text-sm">{condition.description}</p>
          </div>
        ))}
        <p className="text-sm text-gray-500 italic mt-4">
          {t('map.consultation-note')}
        </p>
      </CardContent>
    </Card>
  );
};

export default ConditionDetails;

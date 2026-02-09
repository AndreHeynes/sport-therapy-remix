import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface QuickStatsProps {
  language: string;
}

const QuickStats: React.FC<QuickStatsProps> = ({ language }) => {
  const stats = [
    { value: '95%', label: language === 'sk' ? 'Úspešnosť liečby' : 'Treatment Success Rate' },
    { value: '48h', label: language === 'sk' ? 'Priemer. čas odpovede' : 'Avg. Response Time' },
    { value: '30+', label: language === 'sk' ? 'Liečených stavov' : 'Conditions Treated' },
  ];

  return (
    <Card className="shadow-lg bg-gradient-to-r from-brand-teal to-brand-teal-dark text-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;

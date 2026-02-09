import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BodyPart } from './bodyPartsData';
import bodySilhouette from '@/assets/body-silhouette.png';

interface BodyDiagramProps {
  bodyParts: BodyPart[];
  selectedPart: string | null;
  onPartClick: (partId: string) => void;
  language: string;
}

const BodyDiagram: React.FC<BodyDiagramProps> = ({ bodyParts, selectedPart, onPartClick, language }) => {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        <div className="relative w-full" style={{ paddingBottom: '150%' }}>
          {/* Body silhouette image */}
          <img
            src={bodySilhouette}
            alt="Body diagram"
            className="absolute inset-0 w-full h-full object-contain opacity-80"
          />

          {/* Clickable body part hotspots */}
          {bodyParts.map((part) => (
            <button
              key={part.id}
              onClick={() => onPartClick(part.id)}
              className={`absolute w-8 h-8 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 flex items-center justify-center text-xs font-bold
                ${selectedPart === part.id 
                  ? 'bg-brand-teal text-white scale-125 shadow-glow ring-2 ring-brand-teal/50' 
                  : 'bg-brand-teal/20 text-brand-teal hover:bg-brand-teal/40 hover:scale-110'
                }`}
              style={{ 
                left: `${part.x}%`, 
                top: `${(part.y / 100) * 100}%` 
              }}
              title={part.name}
            >
              <div className="w-3 h-3 rounded-full bg-current" />
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          {language === 'sk' ? 'Kliknite na bod pre viac informácií' : 'Click a point for more info'}
        </p>
      </CardContent>
    </Card>
  );
};

export default BodyDiagram;

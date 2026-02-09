import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BodyPart } from './bodyPartsData';

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
          {/* Body outline SVG */}
          <svg
            viewBox="0 0 100 150"
            className="absolute inset-0 w-full h-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          >
            {/* Simple body outline */}
            {/* Head */}
            <circle cx="50" cy="12" r="8" className="fill-gray-100 stroke-gray-300" />
            {/* Neck */}
            <rect x="47" y="20" width="6" height="5" className="fill-gray-100 stroke-gray-300" />
            {/* Torso */}
            <path d="M35 25 L65 25 L62 55 L38 55 Z" className="fill-gray-100 stroke-gray-300" />
            {/* Left arm */}
            <path d="M35 25 L25 35 L20 50 L22 50 L28 36 L37 27" className="fill-gray-100 stroke-gray-300" />
            {/* Right arm */}
            <path d="M65 25 L75 35 L80 50 L78 50 L72 36 L63 27" className="fill-gray-100 stroke-gray-300" />
            {/* Left leg */}
            <path d="M38 55 L35 75 L33 95 L37 95 L40 75 L42 55" className="fill-gray-100 stroke-gray-300" />
            {/* Right leg */}
            <path d="M58 55 L60 75 L63 95 L67 95 L65 75 L62 55" className="fill-gray-100 stroke-gray-300" />
          </svg>

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

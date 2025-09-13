import React from 'react';
import type { GenerationMode } from '../types';

interface ModeSelectorProps {
  selectedMode: GenerationMode;
  onModeSelect: (mode: GenerationMode) => void;
  t: any;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeSelect, t }) => {
  const modes: { key: GenerationMode; icon: string; title: string; description: string }[] = [
    {
      key: 'text-to-image',
      icon: '✍️',
      title: t.modes.textToImage,
      description: t.modeSelector.textToImageDesc
    },
    {
      key: 'image-to-image',
      icon: '🖼️',
      title: t.modes.imageToImage,
      description: t.modeSelector.imageToImageDesc
    },
    {
      key: 'multi-image-to-image',
      icon: '🖼️📸',
      title: t.modes.multiImageToImage,
      description: t.modeSelector.multiImageToImageDesc
    }
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 mb-4">
          {t.modeSelector.title}
        </h2>
        <p className="text-gray-400">{t.modeSelector.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {modes.map((mode) => (
          <button
            key={mode.key}
            onClick={() => onModeSelect(mode.key)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedMode === mode.key
                ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                : 'border-gray-600 hover:border-gray-500 bg-gray-950/60'
            }`}
          >
            <div className="text-4xl mb-3">{mode.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{mode.title}</h3>
            <p className="text-gray-400 text-sm">{mode.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
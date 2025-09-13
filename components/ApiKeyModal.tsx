import React, { useState } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onSubmit: (apiKey: string) => void;
  t: any;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onSubmit, t }) => {
  const [apiKey, setApiKey] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl border border-white/10 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">API Key Required</h2>
        <p className="text-gray-400 mb-4 text-sm">
          Please enter your Google Gemini API key to continue. You can get one from{' '}
          <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">
            Google AI Studio
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="w-full p-3 bg-gray-800 border border-white/20 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors mb-4"
            autoFocus
          />
          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold rounded-lg disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;
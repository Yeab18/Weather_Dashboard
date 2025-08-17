import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <Sun className="h-8 w-8 text-yellow-300 animate-pulse absolute" />
          <Cloud className="h-12 w-12 text-white ml-4" />
          <CloudRain className="h-6 w-6 text-blue-300 ml-8 mt-2" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Weather Dashboard
      </h1>
      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Get real-time weather information for cities around the world. 
        Search for any city to see current conditions, temperature, and more.
      </p>
    </header>
  );
};
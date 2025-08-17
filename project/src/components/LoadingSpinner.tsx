import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-white/30 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-white/80 text-lg">
        Fetching weather data...
      </p>
    </div>
  );
};
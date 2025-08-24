import React from 'react';
import { Sunrise, Sunset, Eye, Umbrella, Shirt, Car, CheckCircle } from 'lucide-react';

interface WeatherInsightsProps {
  dayForecast: string;
  nightForecast: string;
  suggestions: string[];
}

const WeatherInsights: React.FC<WeatherInsightsProps> = ({
  dayForecast,
  nightForecast,
  suggestions,
}) => {
  const getSuggestionIcon = (suggestion: string) => {
    if (suggestion.includes('umbrella') || suggestion.includes('rain')) {
      return <Umbrella className="w-5 h-5 text-blue-500" />;
    }
    if (suggestion.includes('jacket') || suggestion.includes('warm')) {
      return <Shirt className="w-5 h-5 text-orange-500" />;
    }
    if (suggestion.includes('drive') || suggestion.includes('traffic')) {
      return <Car className="w-5 h-5 text-green-500" />;
    }
    return <CheckCircle className="w-5 h-5 text-green-500" />;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Weather Insights</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Forecast Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Forecast</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-2 mb-2">
                <Sunrise className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-900 font-semibold">Day</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{dayForecast}</p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
              <div className="flex items-center space-x-2 mb-2">
                <Sunset className="w-5 h-5 text-orange-500" />
                <span className="text-gray-900 font-semibold">Night</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{nightForecast}</p>
            </div>
          </div>
        </div>

        {/* Activity Suggestions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Suggestions</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100"
              >
                <div className="flex-shrink-0">
                  {getSuggestionIcon(suggestion)}
                </div>
                <p className="text-gray-700 text-sm">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;
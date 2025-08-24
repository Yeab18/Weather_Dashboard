import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

interface WeatherForecastProps {
  forecast: ForecastDay[];
  temperatureUnit: 'C' | 'F';
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, temperatureUnit }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rain':
      case 'showers':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-blue-300" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Forecast</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors border border-gray-100"
          >
            <div className="text-gray-700 text-sm font-semibold mb-2">
              {day.day}
            </div>
            <div className="text-gray-500 text-xs mb-3">
              {day.date}
            </div>
            <div className="flex justify-center mb-3">
              {getWeatherIcon(day.condition)}
            </div>
            <div className="text-gray-900 text-sm font-bold">
              {day.high}°{temperatureUnit}
            </div>
            <div className="text-gray-500 text-xs">
              {day.low}°{temperatureUnit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
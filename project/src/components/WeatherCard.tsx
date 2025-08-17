import React from 'react';
import { Thermometer, Droplets, Wind, RefreshCw } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherIconUrl } from '../utils/weatherApi';

interface WeatherCardProps {
  weather: WeatherData;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  onRefresh,
  isRefreshing
}) => {
  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'from-red-400 to-orange-500';
    if (temp >= 20) return 'from-yellow-400 to-orange-400';
    if (temp >= 10) return 'from-green-400 to-blue-400';
    if (temp >= 0) return 'from-blue-400 to-purple-500';
    return 'from-blue-600 to-purple-600';
  };

  const getBackgroundGradient = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear') || desc.includes('sunny')) {
      return 'from-yellow-400 via-orange-500 to-red-500';
    }
    if (desc.includes('rain') || desc.includes('drizzle')) {
      return 'from-gray-400 via-blue-500 to-blue-700';
    }
    if (desc.includes('cloud')) {
      return 'from-gray-300 via-gray-500 to-gray-600';
    }
    if (desc.includes('snow')) {
      return 'from-blue-200 via-blue-400 to-blue-600';
    }
    if (desc.includes('thunder')) {
      return 'from-gray-700 via-purple-600 to-blue-800';
    }
    return 'from-blue-400 via-purple-500 to-pink-500';
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {weather.name}, {weather.country}
          </h2>
          <p className="text-white/80 text-sm">
            Last updated: {formatTime(weather.timestamp)}
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw 
            className={`h-5 w-5 text-white ${isRefreshing ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <img
            src={getWeatherIconUrl(weather.icon)}
            alt={weather.description}
            className="w-20 h-20 mx-auto mb-2"
          />
          <p className="text-white/90 text-sm capitalize font-medium">
            {weather.description}
          </p>
        </div>
        <div className="text-center">
          <div className={`bg-gradient-to-r ${getTemperatureColor(weather.temperature)} text-white rounded-xl p-4`}>
            <p className="text-3xl font-bold mb-1">
              {Math.round(weather.temperature)}°C
            </p>
            <p className="text-sm opacity-90">
              Feels like {Math.round(weather.feelsLike)}°C
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <Droplets className="h-5 w-5 text-blue-300 mr-2" />
            <span className="text-white/80 text-sm">Humidity</span>
          </div>
          <p className="text-white text-lg font-semibold">
            {weather.humidity}%
          </p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center mb-2">
            <Wind className="h-5 w-5 text-green-300 mr-2" />
            <span className="text-white/80 text-sm">Wind Speed</span>
          </div>
          <p className="text-white text-lg font-semibold">
            {weather.windSpeed} km/h
          </p>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Cloud, Wind, Droplets, Gauge, Thermometer, Sun, CloudRain } from 'lucide-react';

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
  dewPoint: number;
  temperatureUnit: 'C' | 'F';
  onUnitToggle: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  condition,
  windSpeed,
  humidity,
  pressure,
  dewPoint,
  temperatureUnit,
  onUnitToggle,
}) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-20 h-20 text-yellow-500" />;
      case 'rain':
      case 'showers':
        return <CloudRain className="w-20 h-20 text-blue-500" />;
      default:
        return <Cloud className="w-20 h-20 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Current Weather</h2>
        <button
          onClick={onUnitToggle}
          className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          °{temperatureUnit}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main weather display */}
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {getWeatherIcon(condition)}
          </div>
          <div>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {temperature}°{temperatureUnit}
            </div>
            <div className="text-gray-600 text-xl capitalize font-medium">{condition}</div>
            <div className="text-gray-500 text-sm mt-2">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="w-4 h-4 text-blue-400" />
              <span className="text-gray-600 text-sm font-medium">Wind</span>
            </div>
            <div className="text-gray-900 font-bold text-lg">{windSpeed} km/h</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span className="text-gray-600 text-sm font-medium">Humidity</span>
            </div>
            <div className="text-gray-900 font-bold text-lg">{humidity}%</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              <span className="text-gray-600 text-sm font-medium">Pressure</span>
            </div>
            <div className="text-gray-900 font-bold text-lg">{pressure} hPa</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Thermometer className="w-4 h-4 text-blue-400" />
              <span className="text-gray-600 text-sm font-medium">Dew Point</span>
            </div>
            <div className="text-gray-900 font-bold text-lg">{dewPoint}°{temperatureUnit}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
import { useState, useEffect, useCallback } from 'react';
import { WeatherData, WeatherResponse } from '../types/weather';
import { fetchWeatherData } from '../utils/weatherApi';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformWeatherData = (response: WeatherResponse): WeatherData => {
    return {
      id: response.id,
      name: response.name,
      country: response.sys.country,
      temperature: response.main.temp,
      feelsLike: response.main.feels_like,
      humidity: response.main.humidity,
      windSpeed: response.wind.speed,
      description: response.weather[0].description,
      icon: response.weather[0].icon,
      timestamp: Date.now()
    };
  };

  const searchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchWeatherData(city);
      const weather = transformWeatherData(response);
      
      // Add to or update weather data
      setWeatherData(prev => {
        const existing = prev.find(w => w.name.toLowerCase() === weather.name.toLowerCase());
        if (existing) {
          return prev.map(w => w.id === existing.id ? weather : w);
        }
        return [weather, ...prev.slice(0, 4)]; // Keep max 5 cities
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshWeather = useCallback(async (cityName: string) => {
    const existingWeather = weatherData.find(w => 
      w.name.toLowerCase() === cityName.toLowerCase()
    );
    
    if (!existingWeather) return;

    try {
      const response = await fetchWeatherData(cityName);
      const updatedWeather = transformWeatherData(response);
      
      setWeatherData(prev => 
        prev.map(w => w.id === existingWeather.id ? updatedWeather : w)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh weather data');
    }
  }, [weatherData]);

  const removeWeather = useCallback((id: number) => {
    setWeatherData(prev => prev.filter(w => w.id !== id));
  }, []);

  return {
    weatherData,
    isLoading,
    error,
    searchWeather,
    refreshWeather,
    removeWeather,
    clearError: () => setError(null)
  };
};
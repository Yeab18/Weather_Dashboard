// Weather API service - placeholder implementation
// Replace with actual API integration (OpenWeatherMap, etc.)

import { WeatherData } from '../types/weather';

const MOCK_WEATHER_DATA: WeatherData = {
  city: 'Addis Ababa',
  temperature: 22,
  condition: 'partly cloudy',
  windSpeed: 12,
  humidity: 65,
  pressure: 1013,
  dewPoint: 15,
  forecast: [
    { day: 'Today', date: '12/30', high: 25, low: 18, condition: 'partly cloudy', icon: 'cloud' },
    { day: 'Tomorrow', date: '12/31', high: 27, low: 19, condition: 'sunny', icon: 'sun' },
    { day: 'Wed', date: '01/01', high: 24, low: 17, condition: 'rain', icon: 'rain' },
    { day: 'Thu', date: '01/02', high: 23, low: 16, condition: 'cloudy', icon: 'cloud' },
    { day: 'Fri', date: '01/03', high: 26, low: 18, condition: 'sunny', icon: 'sun' },
    { day: 'Sat', date: '01/04', high: 28, low: 20, condition: 'partly cloudy', icon: 'cloud' },
    { day: 'Sun', date: '01/05', high: 25, low: 19, condition: 'rain', icon: 'rain' },
  ],
};

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock error for demonstration
  if (city.toLowerCase().includes('error')) {
    throw new Error('City not found. Please check the spelling and try again.');
  }
  
  // Return mock data with the requested city
  return {
    ...MOCK_WEATHER_DATA,
    city: city,
  };
};

export const convertTemperature = (temp: number, from: 'C' | 'F', to: 'C' | 'F'): number => {
  if (from === to) return Math.round(temp);
  
  if (from === 'C' && to === 'F') {
    return Math.round((temp * 9/5) + 32);
  }
  
  if (from === 'F' && to === 'C') {
    return Math.round((temp - 32) * 5/9);
  }
  
  return temp;
};
export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
  dewPoint: number;
  forecast: ForecastDay[];
}

export interface ForecastDay {
  day: string;
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export interface WeatherInsights {
  dayForecast: string;
  nightForecast: string;
  suggestions: string[];
}
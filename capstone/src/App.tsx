import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import WeatherInsights from './components/WeatherInsights';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeatherData, convertTemperature } from './services/weatherApi';
import { WeatherData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMenuItem, setActiveMenuItem] = useState('weather');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');


  // Load initial weather data
  useEffect(() => {
    loadWeatherData('Addis Ababa');
  }, []);

  // Auto-refresh weather data every 10 minutes
  useEffect(() => {
    if (!weatherData) return;
    
    const refreshInterval = setInterval(() => {
      loadWeatherData(weatherData.city, true);
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(refreshInterval);
  }, [weatherData]);

  const loadWeatherData = async (city: string, silent = false) => {
    if (!silent) {
      setLoading(true);
      setError(null);
    }
    
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    loadWeatherData(city);
  };

  const handleRetry = () => {
    if (weatherData) {
      loadWeatherData(weatherData.city);
    }
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'C' ? 'F' : 'C');
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const convertWeatherData = (data: WeatherData) => {
    if (temperatureUnit === 'C') return data;
    
    return {
      ...data,
      temperature: convertTemperature(data.temperature, 'C', 'F'),
      dewPoint: convertTemperature(data.dewPoint, 'C', 'F'),
      forecast: data.forecast.map(day => ({
        ...day,
        high: convertTemperature(day.high, 'C', 'F'),
        low: convertTemperature(day.low, 'C', 'F'),
      })),
    };
  };

  const weatherInsights = {
    dayForecast: "Partly cloudy conditions with gentle winds. Perfect for outdoor activities with temperatures reaching a comfortable 25°C. Expect good visibility and minimal chance of precipitation.",
    nightForecast: "Clear skies with cool temperatures dropping to around 18°C. Light winds continuing from the northeast. Excellent conditions for evening walks or outdoor dining.",
    suggestions: [
      "Perfect weather for outdoor activities and exercise",
      "Light jacket recommended for evening outings",
      "Excellent driving conditions with clear visibility",
      "Great day for picnics and outdoor dining"
    ]
  };

  if (activeMenuItem !== 'weather' && activeMenuItem !== 'forecast') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <Sidebar
            activeItem={activeMenuItem}
            onItemClick={setActiveMenuItem}
            isOpen={sidebarOpen}
          />
          <div className="flex-1 md:ml-64">
            <Header
              currentCity={weatherData?.city || 'Loading...'}
              onSearch={handleSearch}
              onMenuToggle={handleMenuToggle}
            />
            <main className="p-6">
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {activeMenuItem.charAt(0).toUpperCase() + activeMenuItem.slice(1)}
                  </h1>
                  <p className="text-gray-600">
                    This section is under development. Switch to Current Weather to see the full dashboard.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar
          activeItem={activeMenuItem}
          onItemClick={setActiveMenuItem}
          isOpen={sidebarOpen}
        />
        
        <div className="flex-1 md:ml-64">
          <Header
            currentCity={weatherData?.city || 'Loading...'}
            onSearch={handleSearch}
            onMenuToggle={handleMenuToggle}
          />
          
          <main className="p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} onRetry={handleRetry} />
              ) : weatherData ? (
                <>
                  <CurrentWeather
                    temperature={convertWeatherData(weatherData).temperature}
                    condition={weatherData.condition}
                    windSpeed={weatherData.windSpeed}
                    humidity={weatherData.humidity}
                    pressure={weatherData.pressure}
                    dewPoint={convertWeatherData(weatherData).dewPoint}
                    temperatureUnit={temperatureUnit}
                    onUnitToggle={toggleTemperatureUnit}
                  />
                  
                  <WeatherForecast
                    forecast={convertWeatherData(weatherData).forecast}
                    temperatureUnit={temperatureUnit}
                  />
                  
                  <WeatherInsights
                    dayForecast={weatherInsights.dayForecast}
                    nightForecast={weatherInsights.nightForecast}
                    suggestions={weatherInsights.suggestions}
                  />
                </>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
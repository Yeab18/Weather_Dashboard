import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useWeatherData } from './hooks/useWeatherData';
import { getRecentSearches, addRecentSearch, clearRecentSearches } from './utils/localStorage';

function App() {
  const {
    weatherData,
    isLoading,
    error,
    searchWeather,
    refreshWeather,
    clearError
  } = useWeatherData();

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [refreshingCities, setRefreshingCities] = useState<Set<string>>(new Set());
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    // Auto-refresh every 5 minutes
    if (weatherData.length > 0) {
      const interval = setInterval(() => {
        weatherData.forEach(weather => {
          refreshWeather(weather.name);
        });
      }, 5 * 60 * 1000); // 5 minutes

      setAutoRefreshInterval(interval);

      return () => {
        if (interval) clearInterval(interval);
      };
    }

    return () => {
      if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
      }
    };
  }, [weatherData, refreshWeather]);

  const handleSearch = async (city: string) => {
    await searchWeather(city);
    addRecentSearch(city);
    setRecentSearches(getRecentSearches());
  };

  const handleRefresh = async (cityName: string) => {
    setRefreshingCities(prev => new Set(prev).add(cityName));
    await refreshWeather(cityName);
    setRefreshingCities(prev => {
      const newSet = new Set(prev);
      newSet.delete(cityName);
      return newSet;
    });
  };

  const handleClearRecentSearches = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const getBackgroundGradient = () => {
    if (weatherData.length === 0) {
      return 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800';
    }

    const primaryWeather = weatherData[0];
    const description = primaryWeather.description.toLowerCase();

    if (description.includes('clear') || description.includes('sunny')) {
      return 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500';
    }
    if (description.includes('rain') || description.includes('drizzle')) {
      return 'bg-gradient-to-br from-gray-600 via-blue-600 to-gray-800';
    }
    if (description.includes('cloud')) {
      return 'bg-gradient-to-br from-gray-400 via-gray-600 to-blue-700';
    }
    if (description.includes('snow')) {
      return 'bg-gradient-to-br from-blue-200 via-blue-500 to-purple-600';
    }
    if (description.includes('thunder')) {
      return 'bg-gradient-to-br from-gray-800 via-purple-700 to-black';
    }

    return 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800';
  };

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} transition-all duration-1000 ease-in-out`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              isLoading={isLoading}
              recentSearches={recentSearches}
              onClearRecentSearches={handleClearRecentSearches}
            />
          </div>

          {error && (
            <div className="mb-8 max-w-md mx-auto">
              <ErrorMessage
                message={error}
                onRetry={clearError}
                type={error.includes('network') || error.includes('fetch') ? 'network' : 'error'}
              />
            </div>
          )}

          {isLoading && weatherData.length === 0 && <LoadingSpinner />}

          {weatherData.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weatherData.map((weather) => (
                <WeatherCard
                  key={weather.id}
                  weather={weather}
                  onRefresh={() => handleRefresh(weather.name)}
                  isRefreshing={refreshingCities.has(weather.name)}
                />
              ))}
            </div>
          )}

          {weatherData.length === 0 && !isLoading && !error && (
            <div className="text-center py-12">
              <div className="bg-white backdrop-blur-lg rounded-3xl p-10 max-w-lg mx-auto border border-white/30 shadow-2xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  🌤️ Start Your Weather Journey
                </h3>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  Discover real-time weather conditions for any city worldwide. 
                  Search for your favorite destinations and stay informed.
                </p>
                <div className="grid grid-cols-1 gap-4 text-gray-600">
                  <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
                    <span className="text-2xl mr-3">🔄</span>
                    <span className="font-medium">Auto-updates every 5 minutes</span>
                  </div>
                  <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
                    <span className="text-2xl mr-3">📱</span>
                    <span className="font-medium">Optimized for all devices</span>
                  </div>
                  <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4">
                    <span className="text-2xl mr-3">💾</span>
                    <span className="font-medium">Recent searches saved</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 text-sm">
                    Try searching: <span className="font-semibold text-gray-700">London</span>, 
                    <span className="font-semibold text-gray-700"> New York</span>, 
                    <span className="font-semibold text-gray-700"> Tokyo</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center mt-12 text-white/60">
          <p className="text-sm font-medium">
            Weather Dashboard • Built with React, TypeScript & Tailwind CSS
          </p>
          <p className="text-xs mt-2">
            Demo mode with mock data • Get your free API key from{' '}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white underline transition-colors duration-200"
            >
              OpenWeatherMap
            </a>
            {' '}for live weather data
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
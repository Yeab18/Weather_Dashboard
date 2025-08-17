import React, { useState, useRef } from 'react';
import { Search, Clock, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  recentSearches: string[];
  onClearRecentSearches: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  recentSearches,
  onClearRecentSearches
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery('');
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleInputFocus = () => {
    if (recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="Search for a city..."
            disabled={isLoading}
            className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-lg"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {showSuggestions && recentSearches.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Recent Searches
            </span>
            <button
              onClick={onClearRecentSearches}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {recentSearches.map((city, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(city)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-gray-700"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
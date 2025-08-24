import React from 'react';
import { Search, MapPin, Menu } from 'lucide-react';

interface HeaderProps {
  currentCity: string;
  onSearch: (city: string) => void;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentCity, onSearch, onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">
              WeatherApp
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{currentCity}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city..."
                className="bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
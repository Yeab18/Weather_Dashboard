const RECENT_SEARCHES_KEY = 'weather-dashboard-recent-searches';
const MAX_RECENT_SEARCHES = 5;

export const getRecentSearches = (): string[] => {
  try {
    const searches = localStorage.getItem(RECENT_SEARCHES_KEY);
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('Error reading recent searches:', error);
    return [];
  }
};

export const addRecentSearch = (city: string): void => {
  try {
    const searches = getRecentSearches();
    const updatedSearches = [
      city,
      ...searches.filter(search => search.toLowerCase() !== city.toLowerCase())
    ].slice(0, MAX_RECENT_SEARCHES);
    
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};

export const clearRecentSearches = (): void => {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
};
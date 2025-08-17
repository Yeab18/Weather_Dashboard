const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: string): Promise<any> => {
  // For demo purposes, we'll use mock data
  // In a real app, you would uncomment the API call below after getting your API key
  
  // const response = await fetch(
  //   `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  // );
  
  // if (!response.ok) {
  //   const error = await response.json();
  //   throw new Error(error.message || 'Failed to fetch weather data');
  // }
  
  // return response.json();

  // Mock data for demonstration
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
  
  const mockWeatherData = {
    coord: { lon: -0.1257, lat: 51.5085 },
    weather: [
      {
        id: 800,
        main: getRandomWeatherType(),
        description: getRandomDescription(),
        icon: getRandomIcon()
      }
    ],
    base: "stations",
    main: {
      temp: Math.floor(Math.random() * 30) + 5,
      feels_like: Math.floor(Math.random() * 30) + 5,
      temp_min: Math.floor(Math.random() * 25) + 5,
      temp_max: Math.floor(Math.random() * 35) + 10,
      pressure: 1013,
      humidity: Math.floor(Math.random() * 60) + 30
    },
    visibility: 10000,
    wind: {
      speed: Math.floor(Math.random() * 15) + 2,
      deg: 250
    },
    clouds: { all: Math.floor(Math.random() * 80) },
    dt: Date.now() / 1000,
    sys: {
      type: 2,
      id: 2019646,
      country: "GB",
      sunrise: 1605683526,
      sunset: 1605717049
    },
    timezone: 0,
    id: 2643743,
    name: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
    cod: 200
  };

  // Simulate API errors for certain city names
  if (city.toLowerCase() === 'error' || city.toLowerCase() === 'invalid') {
    throw new Error('City not found');
  }

  return mockWeatherData;
};

const getRandomWeatherType = () => {
  const types = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Mist'];
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomDescription = () => {
  const descriptions = [
    'clear sky', 'few clouds', 'scattered clouds', 'broken clouds',
    'overcast clouds', 'light rain', 'moderate rain', 'heavy rain',
    'sunny', 'partly cloudy', 'mostly cloudy'
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomIcon = () => {
  const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d'];
  return icons[Math.floor(Math.random() * icons.length)];
};

export const getWeatherIconUrl = (icon: string): string => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
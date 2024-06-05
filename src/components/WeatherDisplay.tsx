import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherProps {
  lat: number;
  lon: number;
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherDisplay: React.FC<WeatherProps> = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      if (!apiKey) {
        setError("API key is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError("Failed to fetch weather data. Please check your API key and the entered coordinates.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, apiKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const { temp, humidity } = weatherData!.main;
  const { speed: windSpeed } = weatherData!.wind;
  const { description, icon } = weatherData!.weather[0];

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Temperature: {temp}°C</p>
      <p>Condition: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      <img src={iconUrl} alt="weather icon" />
    </div>
  );
};

export default WeatherDisplay;

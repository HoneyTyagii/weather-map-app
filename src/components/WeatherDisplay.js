import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const WeatherDisplay = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    if (lat && lon) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      fetchWeather();
    }
  }, [lat, lon, apiKey]);

  if (!weatherData) return <div>Loading...</div>;

  const { temp, humidity } = weatherData.main;
  const { speed: windSpeed } = weatherData.wind;
  const { description, icon } = weatherData.weather[0];

  return (
    <div>
      <h2>Weather Information</h2>
      <p>Temperature: {temp}°C</p>
      <p>Condition: {description}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} m/s</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
    </div>
  );
};

WeatherDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default WeatherDisplay;

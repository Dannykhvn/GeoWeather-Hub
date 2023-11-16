// src/components/WeatherComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherController = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const cityName = 'Los Angeles'; // Example city for testing, replace with dynamic input
    const days = 7; // Example days for testing, replace with dynamic input

    // Make an API request to your Express.js server
    const requestURL = `http://localhost:5000/api/weather/forecast?city=${cityName}&days=${days}`;
    
    axios.get(requestURL)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      <h2>Weather Forecast</h2>
      {weatherData ? (
        // Display weather data in your component
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherController;
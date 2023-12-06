import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weatherController.css";
import { useNavigate } from "react-router-dom";

const convertKelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

const getTodayDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return today.toLocaleDateString("en-US", options);
};

const getWindDirection = (degree) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

const WeatherController = ({ onLogout }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const cityName = "Vancouver"; // Example city for testing, need to replace with dynamic input
  const navigate = useNavigate();

  useEffect(() => {
    const days = 1;

    const requestURL = `http://localhost:5000/api/weather/forecast?city=${cityName}&days=${days}`;

    axios
      .get(requestURL)
      .then((response) => {
        setWeatherData(response.data);
        console.log("Current Weather Data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });


    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getCurrentTime = () => {
    return currentTime.toLocaleTimeString();
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <>
      {weatherData ? (
        weatherData.list.map((item, index) => {
          const temperature = convertKelvinToCelsius(item.main.temp);
          const windDirection = getWindDirection(item.wind.deg);

          return (
            <div key={index} className="weather-box-current-time">
              {item.weather && item.weather[0] && (
                <img
                  src={`${process.env.PUBLIC_URL}/images/icons/${item.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="weather-icon"
                />
              )}
              <img
                src={`${process.env.PUBLIC_URL}/images/geoweather-hub-logo.png`}
                alt="Logo"
                className="logo"
              />
              <h1 className="geoWeather">GeoWeather Hub</h1>
              <div className="logout-container">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
              <div className="weather-header">
                <h2>{item.weather[0].main}</h2>
                <div className="bolded-line"></div>
              </div>
              <div className="current-time">
                <p>{getCurrentTime()}</p>
              </div>
              <div className="weather-day">
                <h3>{getTodayDate()}</h3>
              </div>
              <div className="weather-temperature">
                <p>{Math.round(temperature)}°C</p>
              </div>
              <div className="weather-data-text">
                <div className="search-container">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search City..."
                  />
                  <button className="search-button">
                    <img
                      src="../images/search.png"
                      alt="Search Icon"
                      className="search-icon"
                    />
                  </button>
                </div>

                <h4 className="location">
                  {cityName}, {weatherData.city.country}
                </h4>
                <div className="scrollable-container">
                  <div className="data-row">
                    <span className="label">Weather Description:</span>
                    <span className="value">{item.weather[0].description}</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Temperature:</span>
                    <span className="value">
                      {temperature}°C ({item.weather[0].main})
                    </span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Feels Like:</span>
                    <span className="value">
                      {Math.round(convertKelvinToCelsius(item.main.feels_like))}
                      °C
                    </span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Humidity:</span>
                    <span className="value">{item.main.humidity}%</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Wind Speed:</span>
                    <span>{item.wind.speed} km/h</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Wind Degree:</span>
                    <span>
                      {item.wind.deg}° ({windDirection})
                    </span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Wind Gust:</span>
                    <span>{item.wind.gust} km/h</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Temperature Min:</span>
                    <span className="value">{item.main.temp_min}°C</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Temperature Max:</span>
                    <span className="value">{item.main.temp_max}°C</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Sea Level:</span>
                    <span>{item.main.sea_level} hPa</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Ground Level:</span>
                    <span>{item.main.grnd_level} hPa</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Pressure:</span>
                    <span>{item.main.pressure} hPa</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Visibility:</span>
                    <span>{item.visibility} meters</span>
                  </div>
                  <div className="bolded-line2"></div>
                  <div className="data-row">
                    <span className="label">Population:</span>
                    <span className="value">{weatherData.city.population}</span>
                  </div>
                </div>
                <div className="down-arrow-container">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/downarrow.png`}
                    alt="Down Arrow"
                    className="down-arrow"
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default WeatherController;

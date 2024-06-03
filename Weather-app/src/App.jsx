import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudSun,
  faCloudShowersHeavy,
  faBolt,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const API_KEY = "549532f4c754fa56ffe746f741b5f8f8";
const cityName = "london";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

// Mapping weather conditions to Font Awesome icons
const weatherIcons = {
  "clear sky": faSun,
  "few clouds": faCloudSun,
  "scattered clouds": faCloud,
  "broken clouds": faCloud,
  "shower rain": faCloudShowersHeavy,
  rain: faCloudShowersHeavy,
  thunderstorm: faBolt,
  snow: faSnowflake,
  mist: faSmog,
};

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function getWeatherData() {
      const data = await fetchWeatherData();
      setWeather(data);
      console.log(data.main);
    }
    getWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    const response = await fetch(BASE_URL);
    const result = await response.json();
    return result;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const getWeatherIcon = (weatherDescription) => {
    return weatherIcons[weatherDescription] || faCloud; // fallback to a default icon if no match found
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-screen-md w-full">
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            className="border rounded-md p-2 mr-2 w-full"
            placeholder="Enter city name"
          />
          <button className="bg-blue-500 text-white rounded-md p-2">
            Search
          </button>
        </div>
        {weather ? (
          <>
            <div className="flex justify-around items-center mb-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold">
                  {weather.name}, <span>{weather.sys.country}</span>
                </h1>
                <p className="text-gray-600">{formatDate(weather.dt)}</p>
                <p className="capitalize text-xl">
                  {weather.weather[0].description}
                </p>
              </div>
              <div className="text-center">
                {/* <FontAwesomeIcon
                  icon={getWeatherIcon(weather.weather[0].description)}
                  size="4x"
                /> */}
                <img
                  className="w-24 h-24 mx-auto"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />

                <div className="mt-4">
                  <p className="text-4xl font-bold">{weather.main.temp}°C</p>
                  <p className="text-gray-600">
                    Sunrise:{" "}
                    {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-600">
                    Sunset:{" "}
                    {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-bold">Temperature</h2>
                <p>Min: {weather.main.temp_min}°C</p>
                <p>Max: {weather.main.temp_max}°C</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold">Wind</h2>
                <p>Speed: {weather.wind.speed} m/s</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold">Humidity</h2>
                <p>{weather.main.humidity}%</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold">Pressure</h2>
                <p>{weather.main.pressure} hPa</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold">Visibility</h2>
                <p>{weather.visibility / 1000} km</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;

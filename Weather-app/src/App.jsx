import { useEffect, useState } from "react";
import "./App.css";

// let API_KEY = process.env.WEATHER_API_KEY;

const API_KEY = "549532f4c754fa56ffe746f741b5f8f8";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

function App() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("Jaipur");
  useEffect(() => {
    async function getWeatherData() {
      const data = await fetchWeatherData();
      setWeather(data);
    }
    getWeatherData();
  }, [cityName]);

  const fetchWeatherData = async () => {
    try {
      const url = `${BASE_URL}&q=${cityName}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
      // setWeather(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-screen-md w-full">
        <form onSubmit={handleSubmit} className="mb-4 flex justify-center">
          <input
            type="text"
            className="border rounded-md p-2 mr-2 w-full"
            placeholder="Enter city name"
            // value={cityName}
            onChange={(event) => setCityName(event.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md p-2"
          >
            Search
          </button>
        </form>

        {weather ? (
          <>
            <div className="flex justify-around items-center mb-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold">{weather.name}</h1>
                <p className="text-gray-600">{formatDate(weather.dt)}</p>
                <p className="capitalize text-xl">
                  {weather.weather[0].description}
                </p>
              </div>
              <div className="text-center">
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

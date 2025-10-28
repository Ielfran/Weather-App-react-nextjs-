'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C'); 

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      if (!weatherRes.ok) throw new Error('City not found or invalid API key.');
      const weather = await weatherRes.json();
      setWeatherData(weather);

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      if (!forecastRes.ok) throw new Error('Could not fetch forecast.');
      const forecast = await forecastRes.json();
      setForecastData(forecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-6">Weather Wise</h1>
        <SearchBar onSearch={fetchWeatherData} />
        
        <div className="mt-8">
          {loading && <LoadingSpinner />}
          {error && (
            <p className="text-red-300 bg-red-800/50 p-4 rounded-md text-center font-medium">
              {error}
            </p>
          )}
          {weatherData && <CurrentWeather data={weatherData} unit={unit} toggleUnit={toggleUnit} />}
          {forecastData && <Forecast data={forecastData} unit={unit} />}
        </div>
      </div>
    </main>
  );
}
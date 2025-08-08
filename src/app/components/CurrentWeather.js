import Image from 'next/image';

export default function CurrentWeather({ data, unit, toggleUnit }) {
  if (!data || !data.weather) {
    return <p className="text-white text-center">No weather data available.</p>;
  }

  const { main, name, sys, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const temp = unit === 'C' ? main.temp : (main.temp * 9/5 + 32);
  const feelsLike = unit === 'C' ? main.feels_like : (main.feels_like * 9/5 + 32);

  return (
    <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg text-center text-white w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold">{name}, {sys.country}</h2>
      <div className="flex items-center justify-center">
        <Image src={iconUrl} alt={weather[0].description} width={100} height={100} />
        <p className="text-5xl font-bold ml-4">{temp.toFixed(1)}°{unit}</p>
      </div>
      <p className="text-xl capitalize">{weather[0].description}</p>
      <div className="mt-4 grid grid-cols-2 gap-4 text-left">
        <p><strong>Feels Like:</strong> {feelsLike.toFixed(1)}°{unit}</p>
        <p><strong>Humidity:</strong> {main.humidity}%</p>
        <p><strong>Wind Speed:</strong> {wind.speed.toFixed(1)} m/s</p>
        <p><strong>Pressure:</strong> {main.pressure} hPa</p>
      </div>
      <button
        onClick={toggleUnit}
        className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
}
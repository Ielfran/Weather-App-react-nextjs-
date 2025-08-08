import Image from 'next/image';

export default function Forecast({ data, unit }) {
  if (!data || !data.list) {
    return <p className="text-white text-center">No forecast data available.</p>;
  }

  // Filter for daily forecasts at noon
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => {
          const temp = unit === 'C' ? day.main.temp : (day.main.temp * 9/5 + 32);
          return (
            <div key={index} className="bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-lg text-center text-white">
              <p className="font-semibold">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
              <Image
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                width={50}
                height={50}
                className="mx-auto"
              />
              <p className="text-lg font-bold">{temp.toFixed(1)}°{unit}</p>
              <p className="text-sm capitalize">{day.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
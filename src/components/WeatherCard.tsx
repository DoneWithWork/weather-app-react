import {
  WiCloudy,
  WiCloudyWindy,
  WiDayShowers,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiRain,
  WiSnow,
} from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";

export default function WeatherCard({ data }: any) {
  const WeatherIcon = (weather: string) => {
    switch (weather) {
      case "Clear":
        return <WiDaySunny size={40} color="yellow" />;
      case "Rain":
        return <WiRain size={40} />;
      case "Drizzle":
        return <WiDayShowers size={40} />;
      case "Snow":
        return <WiSnow size={40} />;
      case "Clouds":
        return <WiCloudy size={40} />;
      default:
        return <WiDaySunnyOvercast size={40} />;
    }
  };
  return (
    <div className="weather-container">
      {data && (
        <>
          <div className="weather-card">
            <p className="temp-title">Temperature</p>
            <p className="temp">{data.main.temp}°C</p>
            <div className="weather-icon">
              <p>{data.weather[0].description}</p>
              <div>{WeatherIcon(data.weather[0].main)}</div>
            </div>
          </div>

          <div className="humidity">
            <p>Humidity</p>
            <div className="humidity-stats">
              <p>{data.main.humidity}</p>
              <WiHumidity color="cyan" size={50} />
            </div>
          </div>
          <div className="wind">
            <p className="title">Wind</p>
            <p className="stats">{data.wind.speed} m/s</p>
            <WiCloudyWindy size={50} />
          </div>
        </>
      )}
    </div>
  );
}

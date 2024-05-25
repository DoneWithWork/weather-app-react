import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [data, SetData] = useState<any>(null);
  const [location, Setlocation] = useState<string>("");
  const [pending, SetPending] = useState<boolean>(false);
  const GetWeatherData = async (location: string) => {
    SetPending(true);
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();
    if (data.length === 0) {
      alert("Location not found");
      SetPending(false);
      Setlocation("");
      return;
    }
    console.log(data);
    const { lat, lon } = data[0];
    console.log(lat, lon);
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );

    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    SetData(weatherData);
    SetPending(false);
  };

  return (
    <main>
      <div className="container">
        <p className="title">Weather App</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            GetWeatherData(location);
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Enter location"
              onChange={(e) => Setlocation(e.target.value)}
              value={location}
            />
          </div>
          <div className="btn-form">
            <button disabled={pending} type="submit">
              Get Weather
            </button>
          </div>
        </form>
        <WeatherCard data={data} />
      </div>
    </main>
  );
}

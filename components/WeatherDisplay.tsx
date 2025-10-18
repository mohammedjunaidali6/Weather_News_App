import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react"

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  forecast: Array<{
    day: string
    temp: number
    condition: string
  }>
}

interface Props {
  weather: WeatherData | null
  tempUnit: "C" | "F"
}

export default function WeatherDisplay({ weather, tempUnit }: Props) {
  if (!weather) return null

  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase()
    if (lower.includes("rain")) return <CloudRain className="weather-icon" />
    if (lower.includes("cloud")) return <Cloud className="weather-icon" />
    return <Sun className="weather-icon" />
  }

  return (
    <div className="weather-card">
      <h2>Current Weather</h2>
      <div className="weather-main">
        {getWeatherIcon(weather.condition)}
        <div className="weather-info">
          <div className="temperature">
            {Math.round(weather.temp)}°{tempUnit}
          </div>
          <div className="condition">{weather.condition}</div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail">
          <Droplets size={18} />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div className="detail">
          <Wind size={18} />
          <span>Wind: {weather.windSpeed} km/h</span>
        </div>
      </div>

      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-grid">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className="forecast-item">
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-temp">{Math.round(day.temp)}°</div>
              <div className="forecast-condition">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

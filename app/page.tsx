"use client"

import { useState, useEffect } from "react"
import { Cloud, Settings, Home } from "lucide-react"
import WeatherDisplay from "../components/WeatherDisplay"
import NewsDisplay from "../components/NewsDisplay"
import SettingsScreen from "../components/SettingsScreen"
import { fetchWeather, fetchNews } from "../services/api"
import { filterNewsByWeather } from "../utils/weatherFilter"
import "../App.css"

type Screen = "home" | "settings"

interface AppSettings {
  tempUnit: "C" | "F"
  newsCategories: string[]
  latitude: number
  longitude: number
}

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home")
  const [weather, setWeather] = useState(null)
  const [news, setNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<AppSettings>({
    tempUnit: "C",
    newsCategories: ["general", "technology", "business"],
    latitude: 40.7128,
    longitude: -74.006,
  })

  // Fetch weather and news on mount and when settings change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const weatherData = await fetchWeather(settings.latitude, settings.longitude, settings.tempUnit)
        setWeather(weatherData)

        const newsData = await fetchNews(settings.newsCategories)
        setNews(newsData)

        // Filter news based on weather
        const filtered = filterNewsByWeather(newsData, weatherData)
        setFilteredNews(filtered)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [settings])

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">
            <Cloud size={24} />
            <span>Weather & News</span>
          </div>
          <div className="nav-buttons">
            <button className={`nav-btn ${screen === "home" ? "active" : ""}`} onClick={() => setScreen("home")}>
              <Home size={20} />
              Home
            </button>
            <button
              className={`nav-btn ${screen === "settings" ? "active" : ""}`}
              onClick={() => setScreen("settings")}
            >
              <Settings size={20} />
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : screen === "home" ? (
          <div className="home-screen">
            <div className="content-grid">
              <WeatherDisplay weather={weather} tempUnit={settings.tempUnit} />
              <NewsDisplay news={filteredNews} />
            </div>
          </div>
        ) : (
          <SettingsScreen settings={settings} onSettingsChange={setSettings} />
        )}
      </main>
    </div>
  )
}

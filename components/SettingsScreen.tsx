"use client"

import type React from "react"
import { MapPin } from "lucide-react"

interface Settings {
  tempUnit: "C" | "F"
  newsCategories: string[]
  latitude: number
  longitude: number
}

interface Props {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

const AVAILABLE_CATEGORIES = ["general", "business", "technology", "entertainment", "health", "science", "sports"]

export default function SettingsScreen({ settings, onSettingsChange }: Props) {
  const handleTempUnitChange = (unit: "C" | "F") => {
    onSettingsChange({ ...settings, tempUnit: unit })
  }

  const handleCategoryToggle = (category: string) => {
    const updated = settings.newsCategories.includes(category)
      ? settings.newsCategories.filter((c) => c !== category)
      : [...settings.newsCategories, category]
    onSettingsChange({ ...settings, newsCategories: updated })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>, type: "latitude" | "longitude") => {
    const value = Number.parseFloat(e.target.value)
    onSettingsChange({
      ...settings,
      [type]: isNaN(value) ? settings[type] : value,
    })
  }

  return (
    <div className="settings-screen">
      <div className="settings-section">
        <h2>Temperature Unit</h2>
        <div className="button-group">
          <button
            className={`unit-btn ${settings.tempUnit === "C" ? "active" : ""}`}
            onClick={() => handleTempUnitChange("C")}
          >
            Celsius (°C)
          </button>
          <button
            className={`unit-btn ${settings.tempUnit === "F" ? "active" : ""}`}
            onClick={() => handleTempUnitChange("F")}
          >
            Fahrenheit (°F)
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>Location</h2>
        <div className="location-inputs">
          <div className="input-group">
            <label>Latitude</label>
            <input
              type="number"
              value={settings.latitude}
              onChange={(e) => handleLocationChange(e, "latitude")}
              step="0.01"
              min="-90"
              max="90"
            />
          </div>
          <div className="input-group">
            <label>Longitude</label>
            <input
              type="number"
              value={settings.longitude}
              onChange={(e) => handleLocationChange(e, "longitude")}
              step="0.01"
              min="-180"
              max="180"
            />
          </div>
        </div>
        <p className="hint">
          <MapPin size={14} /> Current: {settings.latitude.toFixed(4)}, {settings.longitude.toFixed(4)}
        </p>
      </div>

      <div className="settings-section">
        <h2>News Categories</h2>
        <div className="categories-grid">
          {AVAILABLE_CATEGORIES.map((category) => (
            <label key={category} className="category-checkbox">
              <input
                type="checkbox"
                checked={settings.newsCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

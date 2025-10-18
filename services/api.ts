// Note: Replace API_KEYS with your actual keys from OpenWeatherMap and NewsAPI

const WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"
const NEWS_API_KEY = "YOUR_NEWSAPI_KEY"

const MOCK_WEATHER = {
  temp: 22,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  forecast: [
    { day: "Mon", temp: 24, condition: "Sunny" },
    { day: "Tue", temp: 20, condition: "Rainy" },
    { day: "Wed", temp: 19, condition: "Cloudy" },
    { day: "Thu", temp: 23, condition: "Sunny" },
    { day: "Fri", temp: 25, condition: "Sunny" },
  ],
}

const MOCK_NEWS = [
  {
    title: "Tech Innovation Breakthrough",
    description: "New technology revolutionizes the industry",
    url: "#",
    image: "/interconnected-technology.png",
    source: "Tech News",
    category: "technology",
  },
  {
    title: "Business Market Reaches New Heights",
    description: "Stock market shows strong performance",
    url: "#",
    image: "/business-meeting-diversity.png",
    source: "Business Daily",
    category: "business",
  },
  {
    title: "General News Update",
    description: "Important developments in the world",
    url: "#",
    image: "/news-collage.png",
    source: "News Network",
    category: "general",
  },
]

export async function fetchWeather(latitude: number, longitude: number, unit: "C" | "F") {
  try {
    if (WEATHER_API_KEY === "YOUR_OPENWEATHERMAP_API_KEY") {
      console.warn("[v0] Weather API key not configured. Using mock data.")
      return MOCK_WEATHER
    }

    const units = unit === "C" ? "metric" : "imperial"
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_API_KEY}`,
    )

    if (!response.ok) {
      console.warn(`[v0] Weather API error: ${response.status}. Using mock data.`)
      return MOCK_WEATHER
    }

    const data = await response.json()

    if (!data || !data.list || data.list.length === 0) {
      console.warn("[v0] Invalid weather data received. Using mock data.")
      return MOCK_WEATHER
    }

    const current = data.list[0]
    const forecast = data.list.filter((_: any, idx: number) => idx % 8 === 0).slice(0, 5)

    return {
      temp: current.main.temp,
      condition: current.weather[0].main,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
      forecast: forecast.map((item: any) => ({
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
        temp: item.main.temp,
        condition: item.weather[0].main,
      })),
    }
  } catch (error) {
    console.error("[v0] Error fetching weather:", error)
    return MOCK_WEATHER
  }
}

export async function fetchNews(categories: string[]) {
  try {
    if (NEWS_API_KEY === "YOUR_NEWSAPI_KEY") {
      console.warn("[v0] News API key not configured. Using mock data.")
      return MOCK_NEWS
    }

    const categoryQuery = categories.join(" OR ")
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(categoryQuery)}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${NEWS_API_KEY}`,
    )

    if (!response.ok) {
      console.warn(`[v0] News API error: ${response.status}. Using mock data.`)
      return MOCK_NEWS
    }

    const data = await response.json()

    if (!data || !data.articles || data.articles.length === 0) {
      console.warn("[v0] Invalid news data received. Using mock data.")
      return MOCK_NEWS
    }

    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      source: article.source.name,
      category: "news",
    }))
  } catch (error) {
    console.error("[v0] Error fetching news:", error)
    return MOCK_NEWS
  }
}

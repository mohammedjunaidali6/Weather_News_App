interface NewsArticle {
  title: string
  description: string
  url: string
  image: string
  source: string
  category: string
}

interface WeatherData {
  temp: number
  condition: string
}

export function filterNewsByWeather(news: NewsArticle[], weather: WeatherData): NewsArticle[] {
  if (!weather) return news

  const temp = weather.temp
  const condition = weather.condition.toLowerCase()

  // Define temperature thresholds
  const isCold = temp < 10
  const isHot = temp > 25
  const isCool = temp >= 10 && temp <= 25

  // Define keywords for filtering
  const depressingKeywords = [
    "crisis",
    "disaster",
    "tragedy",
    "death",
    "loss",
    "decline",
    "recession",
    "unemployment",
    "poverty",
    "war",
    "conflict",
    "accident",
    "failure",
  ]

  const fearKeywords = [
    "danger",
    "threat",
    "risk",
    "fear",
    "panic",
    "alert",
    "warning",
    "attack",
    "crime",
    "virus",
    "disease",
    "emergency",
    "disaster",
  ]

  const happyKeywords = [
    "win",
    "victory",
    "success",
    "achievement",
    "celebration",
    "happy",
    "joy",
    "triumph",
    "record",
    "breakthrough",
    "milestone",
    "award",
  ]

  const filterByKeywords = (keywords: string[]): NewsArticle[] => {
    return news.filter((article) => {
      const text = `${article.title} ${article.description}`.toLowerCase()
      return keywords.some((keyword) => text.includes(keyword))
    })
  }

  if (isCold) {
    return filterByKeywords(depressingKeywords)
  } else if (isHot) {
    return filterByKeywords(fearKeywords)
  } else if (isCool) {
    return filterByKeywords(happyKeywords)
  }

  return news
}

import { ExternalLink } from "lucide-react"

interface NewsArticle {
  title: string
  description: string
  url: string
  image: string
  source: string
  category: string
}

interface Props {
  news: NewsArticle[]
}

export default function NewsDisplay({ news }: Props) {
  return (
    <div className="news-card">
      <h2>Weather-Filtered News</h2>
      <div className="news-list">
        {news.length > 0 ? (
          news.map((article, idx) => (
            <article key={idx} className="news-item">
              {article.image && (
                <img src={article.image || "/placeholder.svg"} alt={article.title} className="news-image" />
              )}
              <div className="news-content">
                <div className="news-category">{article.category}</div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="news-footer">
                  <span className="news-source">{article.source}</span>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                    Read More <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="no-news">No news articles found for current weather conditions.</p>
        )}
      </div>
    </div>
  )
}

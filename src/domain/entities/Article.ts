/**
 * Core Article entity representing a news article
 * This is a pure domain model with no external dependencies
 */
export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: Source;
  author?: string;
  content?: string;
  category?: string;
}

/**
 * Represents the source of an article
 */
export interface Source {
  id: string | null;
  name: string;
}

/**
 * Article collection with pagination info
 */
export interface ArticleCollection {
  articles: Article[];
  totalResults: number;
  page: number;
  pageSize: number;
}

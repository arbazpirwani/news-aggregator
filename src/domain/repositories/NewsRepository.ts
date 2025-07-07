import type { ArticleCollection } from "../entities/Article";
import type { Category, Country, Language } from "../entities/UserPreferences";

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface HeadlinesParams extends PaginationParams {
  provider?: string;
  country?: Country;
  category?: Category;
  sources?: string[];
}

export interface SearchParams extends PaginationParams {
  query: string;
  sources?: string[];
  from?: string;
  to?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  language?: Language;
}

export interface SourceParams {
  category?: Category;
  language?: Language;
  country?: Country;
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  language: Language;
  country: Country;
}

export interface NewsRepository {
  getTopHeadlines(params?: HeadlinesParams): Promise<ArticleCollection>;

  searchArticles(params: SearchParams): Promise<ArticleCollection>;

  getArticlesBySource(
    sourceId: string,
    params?: PaginationParams,
  ): Promise<ArticleCollection>;

  getSources(params?: SourceParams): Promise<NewsSource[]>;
}

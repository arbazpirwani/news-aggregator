import type { ArticleCollection } from '../entities/Article';
import { Category, Country, Language } from '../entities/UserPreferences';

/**
 * Repository interface for news data operations
 * This is a contract that data layer must implement
 */
export interface NewsRepository {
    /**
     * Get top headlines
     */
    getTopHeadlines(params?: HeadlinesParams): Promise<ArticleCollection>;

    /**
     * Search articles by query
     */
    searchArticles(params: SearchParams): Promise<ArticleCollection>;

    /**
     * Get articles by source
     */
    getArticlesBySource(sourceId: string, params?: PaginationParams): Promise<ArticleCollection>;

    /**
     * Get available news sources
     */
    getSources(params?: SourceParams): Promise<NewsSource[]>;
}

/**
 * Parameters for fetching headlines
 */
export interface HeadlinesParams extends PaginationParams {
    country?: Country;
    category?: Category;
    sources?: string[];
}

/**
 * Parameters for searching articles
 */
export interface SearchParams extends PaginationParams {
    query: string;
    sources?: string[];
    from?: string;
    to?: string;
    sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
    language?: Language;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
    page?: number;
    pageSize?: number;
}

/**
 * Parameters for fetching sources
 */
export interface SourceParams {
    category?: Category;
    language?: Language;
    country?: Country;
}

/**
 * News source information
 */
export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: Category;
    language: Language;
    country: Country;
}
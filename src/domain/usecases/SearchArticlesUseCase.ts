import type { ArticleCollection } from "../entities/Article";
import type {
  NewsRepository,
  SearchParams,
} from "../repositories/NewsRepository";

/**
 * Use case for searching articles
 * Implements business logic for article search
 */
export class SearchArticlesUseCase {
  private newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async execute(params: SearchParams): Promise<ArticleCollection> {
    // Validate search query
    if (!params.query || params.query.trim().length === 0) {
      throw new Error("Search query cannot be empty");
    }

    if (params.query.length < 2) {
      throw new Error("Search query must be at least 2 characters");
    }

    // Validate date range if provided
    if (params.from && params.to) {
      const fromDate = new Date(params.from);
      const toDate = new Date(params.to);

      if (fromDate > toDate) {
        throw new Error("From date cannot be after to date");
      }

      // Check if date range is not too wide (e.g., max 30 days)
      const daysDiff =
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff > 30) {
        throw new Error("Date range cannot exceed 30 days");
      }
    }

    // Validate pagination
    if (params.pageSize && params.pageSize > 100) {
      throw new Error("Page size cannot exceed 100");
    }

    // Execute search
    return await this.newsRepository.searchArticles(params);
  }
}

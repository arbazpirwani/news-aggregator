import type {
  NewsRepository,
  HeadlinesParams,
  SearchParams,
  PaginationParams,
  SourceParams,
  NewsSource,
} from "../../domain/repositories/NewsRepository";
import type { ArticleCollection } from "../../domain/entities/Article";
import { GuardianApiClient } from "../api/GuardianApiClient";
import { ArticleMapper } from "../mappers/ArticleMapper";
import { env } from "../../config/env";
import {
  Category,
  Country,
  Language,
} from "../../domain/entities/UserPreferences";

export class GuardianRepositoryImpl implements NewsRepository {
  private client: GuardianApiClient;

  constructor() {
    const key = env.GUARDIAN_KEY;
    if (!key) throw new Error("Guardian API key not configured");
    this.client = new GuardianApiClient(key);
  }

  /**
   * Fetch top headlines: only supports category & pagination
   */
  public async getTopHeadlines(
    params?: HeadlinesParams,
  ): Promise<ArticleCollection> {
    const res = await this.client.searchArticles({
      section: params?.category,
      page: params?.page,
      "page-size": params?.pageSize,
    });

    const articles = res.response.results.map(ArticleMapper.fromGuardian);
    return {
      articles,
      totalResults: res.response.total,
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 20,
    };
  }

  /**
   * Full-text search with optional from/to date filters
   */
  public async searchArticles(
    params: SearchParams,
  ): Promise<ArticleCollection> {
    const res = await this.client.searchArticles({
      q: params.query,
      "from-date": params.from,
      "to-date": params.to,
      page: params.page,
      "page-size": params.pageSize,
    });

    const articles = res.response.results.map(ArticleMapper.fromGuardian);
    return {
      articles,
      totalResults: res.response.total,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 20,
    };
  }

  /**
   * Search by source uses full-text search (Guardian has no direct source endpoint)
   */
  public async getArticlesBySource(
    sourceId: string,
    params?: PaginationParams,
  ): Promise<ArticleCollection> {
    return this.searchArticles({
      query: "",
      sources: [sourceId],
      page: params?.page,
      pageSize: params?.pageSize,
    });
  }

  /**
   * Fetch available sections as sources; map to NewsSource
   */
  public async getSources(_params?: SourceParams): Promise<NewsSource[]> {
    const sections = await this.client.fetchSections();
    return sections.map((s) => ({
      id: s.id,
      name: s.webTitle,
      description: "",
      url: s.webUrl,
      category: s.id as Category,
      language: Language.EN,
      country: Country.GB,
    }));
  }
}

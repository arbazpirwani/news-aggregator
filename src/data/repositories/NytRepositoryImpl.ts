import type { ArticleCollection } from "../../domain/entities/Article";
import type {
  NewsRepository,
  HeadlinesParams,
  SearchParams,
  PaginationParams,
  SourceParams,
  NewsSource,
} from "../../domain/repositories/NewsRepository";
import { NytApiClient } from "../api/NytApiClient";
import { ArticleMapper } from "../mappers/ArticleMapper";
import { env } from "../../config/env";
import type {
  Category,
  Country,
  Language,
} from "../../domain/entities/UserPreferences";

export class NytRepositoryImpl implements NewsRepository {
  private client: NytApiClient;

  constructor() {
    const key = env.NYT_KEY;
    if (!key) throw new Error("NYT API key not configured");
    this.client = new NytApiClient(key);
  }

  /** Top Stories endpoint (falls back to 'home') */
  public async getTopHeadlines(
    params?: HeadlinesParams,
  ): Promise<ArticleCollection> {
    const section = params?.category ?? "home";
    const res: any = await this.client.getTopStories(section);
    const results: any[] = res.results ?? [];
    const totalResults = res.num_results ?? results.length;
    const articles = results.map(ArticleMapper.fromNyt);

    return {
      articles,
      totalResults,
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? totalResults,
    };
  }

  /** Article Search endpoint */
  public async searchArticles(
    params: SearchParams,
  ): Promise<ArticleCollection> {
    // only q, page, pageSize are supported by NytApiClient.searchArticles
    const res: any = await this.client.searchArticles({
      q: params.query,
      page: params.page,
      pageSize: params.pageSize,
    });

    const docs: any[] = res.response?.docs ?? [];
    const totalResults = res.response?.meta?.hits ?? docs.length;
    const articles = docs.map(ArticleMapper.fromNyt);

    return {
      articles,
      totalResults,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? articles.length,
    };
  }

  /** Fallback for source filtering */
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

  /** Static list of “sections” as sources */
  public async getSources(_params?: SourceParams): Promise<NewsSource[]> {
    const sections = [
      "home",
      "world",
      "us",
      "business",
      "technology",
      "sports",
    ];
    return sections.map((sec) => ({
      id: sec,
      name: sec.charAt(0).toUpperCase() + sec.slice(1),
      description: "",
      url: "",
      category: sec as Category,
      language: "en" as Language,
      country: "us" as Country,
    }));
  }
}

import type {
    NewsRepository,
    HeadlinesParams,
    SearchParams,
    PaginationParams,
    SourceParams,
    NewsSource
} from '../../domain/repositories/NewsRepository';
import type { ArticleCollection } from '../../domain/entities/Article';
import { NytApiClient } from '../api/NytApiClient';
import { ArticleMapper } from '../mappers/ArticleMapper';

export class NytRepositoryImpl implements NewsRepository {
    private client: NytApiClient;

    constructor() {
        const key = import.meta.env.VITE_NYT_KEY;
        if (!key) throw new Error('NYT API key not configured');
        this.client = new NytApiClient(key);
    }

    async getTopHeadlines(
        params?: HeadlinesParams
    ): Promise<ArticleCollection> {
        const res = await this.client.getTopStories();
        const articles = res.results.map(ArticleMapper.fromNyt);
        return {
            articles,
            totalResults: res.num_results,
            page: 1,
            pageSize: params?.pageSize || res.num_results,
        };
    }

    async searchArticles(
        params: SearchParams
    ): Promise<ArticleCollection> {
        const res = await this.client.searchArticles({
            q: params.query,
            page: params.page,
            pageSize: params.pageSize,
        });
        const docs = res.response.docs;
        const articles = docs.map(ArticleMapper.fromNyt);
        return {
            articles,
            totalResults: res.response.meta.hits,
            page: params.page || 1,
            pageSize: params.pageSize || articles.length,
        };
    }

    async getArticlesBySource(
        sourceId: string,
        params?: PaginationParams
    ): Promise<ArticleCollection> {
        // No direct source filter in NYT; fallback to search on section_name
        return this.searchArticles({
            query: '',
            sources: [sourceId],
            page: params?.page,
            pageSize: params?.pageSize,
        });
    }

    async getSources(params?: SourceParams): Promise<NewsSource[]> {
        // NYT doesn’t provide a “sources” endpoint—manually return common sections or skip
        const sections = ['home','world','us','business','technology','sports'];
        return sections.map(sec => ({
            id: sec,
            name: sec.charAt(0).toUpperCase()+sec.slice(1),
            description: '',
            url: '',
            category: sec,
            language: 'en',
            country: 'us',
        }));
    }
}

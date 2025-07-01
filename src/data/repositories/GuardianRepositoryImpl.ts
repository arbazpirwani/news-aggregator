import type {
    NewsRepository,
    HeadlinesParams,
    SearchParams,
    PaginationParams,
    SourceParams,
    NewsSource
} from '../../domain/repositories/NewsRepository';
import type { ArticleCollection } from '../../domain/entities/Article';
import { GuardianApiClient } from '../api/GuardianApiClient';
import { ArticleMapper } from '../mappers/ArticleMapper';

export class GuardianRepositoryImpl implements NewsRepository {
    private client: GuardianApiClient;

    constructor() {
        const key = import.meta.env.VITE_GUARDIAN_KEY;
        if (!key) throw new Error('Guardian API key not configured');
        this.client = new GuardianApiClient(key);
    }

    async getTopHeadlines(
        params?: HeadlinesParams
    ): Promise<ArticleCollection> {
        const res = await this.client.searchArticles({
            section: params?.category,
            'from-date': params?.from,
            'to-date': params?.to,
            page: params?.page,
            'page-size': params?.pageSize,
        });
        const articles = res.response.results.map(ArticleMapper.fromGuardian);
        return {
            articles,
            totalResults: res.response.total,
            page: params?.page || 1,
            pageSize: params?.pageSize || 20,
        };
    }

    async searchArticles(
        params: SearchParams
    ): Promise<ArticleCollection> {
        const res = await this.client.searchArticles({
            q: params.query,
            'from-date': params.from,
            'to-date': params.to,
            page: params.page,
            'page-size': params.pageSize,
        });
        const articles = res.response.results.map(ArticleMapper.fromGuardian);
        return {
            articles,
            totalResults: res.response.total,
            page: params.page || 1,
            pageSize: params.pageSize || 20,
        };
    }

    async getArticlesBySource(
        sourceId: string,
        params?: PaginationParams
    ): Promise<ArticleCollection> {
        // Guardian has no direct source endpoint, so we search by section
        return this.searchArticles({
            query: '',
            sources: [sourceId],
            page: params?.page,
            pageSize: params?.pageSize,
        });
    }

    async getSources(params?: SourceParams): Promise<NewsSource[]> {
        const sections = await this.client.fetchSections();
        return sections.map(s => ({
            id: s.id,
            name: s.webTitle,
            description: '',
            url: s.webUrl,
            category: s.id as any,
            language: 'en',    // Guardian API is English-only by default
            country: 'us',     // or omit if you don’t need country
        }));
    }
}

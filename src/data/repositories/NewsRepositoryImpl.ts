import type {
    NewsRepository,
    HeadlinesParams,
    SearchParams,
    PaginationParams,
    NewsSource,
    SourceParams
} from '../../domain/repositories/NewsRepository';
import type {ArticleCollection} from '../../domain/entities/Article';
import {NewsApiClient} from '../api/NewsApiClient';
import {ArticleMapper} from '../mappers/ArticleMapper';

/**
 * Implementation of NewsRepository using NewsAPI
 */
export class NewsRepositoryImpl implements NewsRepository {
    private newsApiClient: NewsApiClient;

    constructor() {
        const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
        if (!apiKey) {
            throw new Error('NewsAPI key is not configured');
        }
        this.newsApiClient = new NewsApiClient(apiKey);
    }

    async getTopHeadlines(params?: HeadlinesParams): Promise<ArticleCollection> {
        // Default at least one filter: country defaults to 'us'
        const {
            country = 'us',
            category,
            sources = [],
            page = 1,
            pageSize = 20
        } = params || {};

        try {
            const response = await this.newsApiClient.getTopHeadlines({
                country,
                category,
                sources: sources.join(','),
                page,
                pageSize,
            });

            const articles = response.articles.map(dto => ArticleMapper.fromNewsApi(dto));

            return {
                articles,
                totalResults: response.totalResults,
                page: params?.page || 1,
                pageSize: params?.pageSize || 20,
            };
        } catch (error) {
            console.error('Error fetching headlines:', error);
            throw error;
        }
    }

    async searchArticles(params: SearchParams): Promise<ArticleCollection> {
        try {
            const response = await this.newsApiClient.searchEverything({
                q: params.query,
                sources: params.sources?.join(','),
                from: params.from,
                to: params.to,
                sortBy: params.sortBy,
                page: params.page,
                pageSize: params.pageSize,
            });

            const articles = response.articles.map(dto => ArticleMapper.fromNewsApi(dto));

            return {
                articles,
                totalResults: response.totalResults,
                page: params.page || 1,
                pageSize: params.pageSize || 20,
            };
        } catch (error) {
            console.error('Error searching articles:', error);
            throw error;
        }
    }

    async getArticlesBySource(sourceId: string, params?: PaginationParams): Promise<ArticleCollection> {
        // Use searchEverything with source filter
        return this.searchArticles({
            query: '*', // Search all
            sources: [sourceId],
            page: params?.page,
            pageSize: params?.pageSize,
        });
    }

    async getSources(params?: SourceParams): Promise<NewsSource[]> {
        try {
            const response = await this.newsApiClient.getSources({
                category: params?.category,
                language: params?.language,
                country: params?.country,
            });

            return response.sources.map(source => ({
                id: source.id,
                name: source.name,
                description: source.description,
                url: source.url,
                category: source.category as any, // Will need to map to our enum
                language: source.language as any,
                country: source.country as any,
            }));
        } catch (error) {
            console.error('Error fetching sources:', error);
            throw error;
        }
    }
}
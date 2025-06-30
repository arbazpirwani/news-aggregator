import { BaseApiClient } from './BaseApiClient.ts';
import { NewsApiResponseDto, NewsApiSourcesResponseDto } from '../dto/NewsApiDto';

/**
 * NewsAPI.org API client
 */
export class NewsApiClient extends BaseApiClient {
    constructor(apiKey: string) {
        super('https://newsapi.org/v2', apiKey);
    }

    /**
     * Get top headlines
     */
    async getTopHeadlines(params: {
        country?: string;
        category?: string;
        sources?: string;
        page?: number;
        pageSize?: number;
    }): Promise<NewsApiResponseDto> {
        return this.get<NewsApiResponseDto>('/top-headlines', {
            params: {
                ...params,
                apiKey: this.apiKey,
            },
        });
    }

    /**
     * Search everything
     */
    async searchEverything(params: {
        q: string;
        sources?: string;
        from?: string;
        to?: string;
        sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
        page?: number;
        pageSize?: number;
    }): Promise<NewsApiResponseDto> {
        return this.get<NewsApiResponseDto>('/everything', {
            params: {
                ...params,
                apiKey: this.apiKey,
            },
        });
    }

    /**
     * Get news sources
     */
    async getSources(params?: {
        category?: string;
        language?: string;
        country?: string;
    }): Promise<NewsApiSourcesResponseDto> {
        return this.get<NewsApiSourcesResponseDto>('/sources', {
            params: {
                ...params,
                apiKey: this.apiKey,
            },
        });
    }
}
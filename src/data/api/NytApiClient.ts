import { BaseApiClient } from './BaseApiClient';
import type { NytResponseDto } from '../dto/NytApiDto';

export class NytApiClient extends BaseApiClient {
    constructor(apiKey: string) {
        super('https://api.nytimes.com/svc', apiKey);
    }

    async getTopStories(section = 'home'): Promise<NytResponseDto> {
        return this.get<NytResponseDto>(`/topstories/v2/${section}.json`, {
            params: { 'api-key': this.apiKey },
        });
    }

    async searchArticles(params: {
        q: string;
        page?: number;
        pageSize?: number;
    }): Promise<NytResponseDto> {
        return this.get<NytResponseDto>('/search/v2/articlesearch.json', {
            params: {
                'api-key': this.apiKey,
                q: params.q,
                page: params.page,
                'page-size': params.pageSize,
            },
        });
    }
}

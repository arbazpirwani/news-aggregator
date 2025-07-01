import { BaseApiClient } from './BaseApiClient';
import type {
    GuardianResponseDto,
    GuardianSectionDto
} from '../dto/GuardianApiDto';

export class GuardianApiClient extends BaseApiClient {
    constructor(apiKey: string) {
        super('/guardian', apiKey);
    }

    async searchArticles(params: {
        q?: string;
        section?: string;
        'from-date'?: string;
        'to-date'?: string;
        page?: number;
        'page-size'?: number;
    }): Promise<GuardianResponseDto> {
        return this.get<GuardianResponseDto>('/search', {
            params: {
                'api-key': this.apiKey,
                q: params.q,
                section: params.section,
                'from-date': params['from-date'],
                'to-date': params['to-date'],
                page: params.page,
                'page-size': params['page-size'],
            },
        });
    }

    async fetchSections(): Promise<GuardianSectionDto[]> {
        const res = await this.get<{ results: GuardianSectionDto[] }>('/sections', {
            params: { 'api-key': this.apiKey },
        });
        return res.results;
    }
}

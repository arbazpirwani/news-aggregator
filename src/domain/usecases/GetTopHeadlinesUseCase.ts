import type {ArticleCollection} from '../entities/Article';
import type {HeadlinesParams, NewsRepository} from '../repositories/NewsRepository';

/**
 * Use case for fetching top headlines
 * Implements business logic for retrieving headlines
 */
export class GetTopHeadlinesUseCase {
    constructor(private newsRepository: NewsRepository) {}

    async execute(params?: HeadlinesParams): Promise<ArticleCollection> {
        // Business logic validations
        if (params?.pageSize && params.pageSize > 100) {
            throw new Error('Page size cannot exceed 100');
        }

        if (params?.page && params.page < 1) {
            throw new Error('Page number must be greater than 0');
        }

        return await this.newsRepository.getTopHeadlines(params);
    }
}
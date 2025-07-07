import type { ArticleCollection } from '../entities/Article.ts'
import type { HeadlinesParams, NewsRepository } from '../repositories/NewsRepository.ts'

/**
 * Use case for fetching top headlines.
 * All filtering parameters are declared in `HeadlinesParams`.
 */
export class GetTopHeadlinesUseCase {
    constructor(private newsRepository: NewsRepository) {}

    async execute(params?: HeadlinesParams): Promise<ArticleCollection> {
        // Business validations (pageSize, page, etc.)
        if (params?.pageSize && params.pageSize > 100) {
            throw new Error('Page size cannot exceed 100')
        }
        if (params?.page != null && params.page < 1) {
            throw new Error('Page number must be greater than 0')
        }

        // Forward the entire params bag to the repository
        return this.newsRepository.getTopHeadlines(params)
    }
}

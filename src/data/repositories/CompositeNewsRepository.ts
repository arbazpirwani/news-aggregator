import type {
    ArticleCollection,
    NewsRepository,
    HeadlinesParams,
    SearchParams,
    PaginationParams,
    SourceParams,
    NewsSource
} from '../../domain';

/**
 * Aggregates multiple NewsRepository implementations into one,
 * and tolerates individual failures.
 */
export class CompositeNewsRepository implements NewsRepository {
    constructor(private repos: NewsRepository[]) {
    }

    /** Fetch top headlines from all repos, tolerate failures */
    async getTopHeadlines(params?: HeadlinesParams): Promise<ArticleCollection> {
        const settled = await Promise.allSettled(
            this.repos.map(r => r.getTopHeadlines(params))
        );

        // Pick only the fulfilled results
        const successes = settled.filter(
            (r): r is PromiseFulfilledResult<ArticleCollection> => r.status === 'fulfilled'
        );
        const failures = settled.filter(
            (r): r is PromiseRejectedResult => r.status === 'rejected'
        );
        failures.forEach(f => console.warn('[Composite] getTopHeadlines failed:', f.reason));

        // Flatten, sort, and sum totals
        const articles = successes
            .flatMap(r => r.value.articles)
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        const totalResults = successes.reduce((sum, r) => sum + r.value.totalResults, 0);

        return {
            articles,
            totalResults,
            page: params?.page ?? 1,
            pageSize: params?.pageSize ?? articles.length,
        };
    }

    /** Search across all repos, tolerate failures */
    async searchArticles(params: SearchParams): Promise<ArticleCollection> {
        const settled = await Promise.allSettled(
            this.repos.map(r => r.searchArticles(params))
        );

        const successes = settled.filter(
            (r): r is PromiseFulfilledResult<ArticleCollection> => r.status === 'fulfilled'
        );
        const failures = settled.filter(
            (r): r is PromiseRejectedResult => r.status === 'rejected'
        );
        failures.forEach(f => console.warn('[Composite] searchArticles failed:', f.reason));

        const articles = successes
            .flatMap(r => r.value.articles)
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        const totalResults = successes.reduce((sum, r) => sum + r.value.totalResults, 0);

        return {
            articles,
            totalResults,
            page: params.page ?? 1,
            pageSize: params.pageSize ?? articles.length,
        };
    }

    /** Merge getArticlesBySource from all repos, tolerate failures */
    async getArticlesBySource(
        sourceId: string,
        params?: PaginationParams
    ): Promise<ArticleCollection> {
        const settled = await Promise.allSettled(
            this.repos.map(r => r.getArticlesBySource(sourceId, params))
        );

        const successes = settled.filter(
            (r): r is PromiseFulfilledResult<ArticleCollection> => r.status === 'fulfilled'
        );
        const failures = settled.filter(
            (r): r is PromiseRejectedResult => r.status === 'rejected'
        );
        failures.forEach(f => console.warn('[Composite] getArticlesBySource failed:', f.reason));

        const articles = successes
            .flatMap(r => r.value.articles)
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        const totalResults = successes.reduce((sum, r) => sum + r.value.totalResults, 0);

        return {
            articles,
            totalResults,
            page: params?.page ?? 1,
            pageSize: params?.pageSize ?? articles.length,
        };
    }

    /** Aggregate sources across all repos, dedupe by ID */
    async getSources(params?: SourceParams): Promise<NewsSource[]> {
        const lists = await Promise.all(
            this.repos.map(r => r.getSources(params))
        );
        const all = lists.flat();
        const map = new Map<string, NewsSource>();
        all.forEach(src => {
            if (!map.has(src.id)) map.set(src.id, src);
        });
        return Array.from(map.values());
    }
}

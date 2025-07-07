import {Provider} from '../../domain/entities/Provider'
import type {
    NewsRepository,
    HeadlinesParams,
    SearchParams,
    PaginationParams,
    SourceParams,
    ArticleCollection,
    NewsSource,
} from '../../domain'
import {NewsRepositoryImpl} from './NewsRepositoryImpl'
import {GuardianRepositoryImpl} from './GuardianRepositoryImpl'
import {NytRepositoryImpl} from './NytRepositoryImpl'
import type {Article} from '../../domain'

export class CompositeNewsRepository implements NewsRepository {
    private readonly repos: NewsRepository[] = [
        new NewsRepositoryImpl(),
        new GuardianRepositoryImpl(),
        new NytRepositoryImpl(),
    ]

    public async getTopHeadlines(params?: HeadlinesParams): Promise<ArticleCollection> {
        const targets = params?.provider
            ? this.repos.filter(r =>
                (params.provider === Provider.NEWSAPI && r instanceof NewsRepositoryImpl) ||
                (params.provider === Provider.GUARDIAN && r instanceof GuardianRepositoryImpl) ||
                (params.provider === Provider.NYTIMES && r instanceof NytRepositoryImpl)
            )
            : this.repos

        const settled = await Promise.allSettled(
            targets.map(r => r.getTopHeadlines(params))
        )

        // Narrow to only the fulfilled results, each with value: ArticleCollection
        const successes = settled.filter(
            (r): r is PromiseFulfilledResult<ArticleCollection> => r.status === 'fulfilled'
        )

        // Now we know `r.value.articles` is Article[]—so force that type
        const articles: Article[] = successes
            .flatMap(r => r.value.articles as Article[])
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

        const totalResults = successes.reduce((sum, r) => sum + r.value.totalResults, 0)

        return {
            articles,
            totalResults,
            page: params?.page ?? 1,
            pageSize: params?.pageSize ?? articles.length,
        }
    }

    public async searchArticles(params: SearchParams): Promise<ArticleCollection> {
        const settled = await Promise.allSettled(
            this.repos.map(r => r.searchArticles(params))
        )
        const successes = settled.filter(
            (r): r is PromiseFulfilledResult<ArticleCollection> => r.status === 'fulfilled'
        )

        const articles: Article[] = successes
            .flatMap(r => r.value.articles as Article[])
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

        const totalResults = successes.reduce((sum, r) => sum + r.value.totalResults, 0)

        return {
            articles,
            totalResults,
            page: params.page ?? 1,
            pageSize: params.pageSize ?? articles.length,
        }
    }

    public async getArticlesBySource(
        sourceId: string,
        params?: PaginationParams
    ): Promise<ArticleCollection> {
        const settled = await Promise.allSettled(
            this.repos.map(r => r.getArticlesBySource(sourceId, params))
        )
        const successes = settled.filter(
            (r): r is PromiseFulfilledResult<ArticleCollection> => r.status === 'fulfilled'
        )

        const articles: Article[] = successes
            .flatMap(r => r.value.articles as Article[])
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

        const totalResults = successes.reduce((sum, r) => sum + r.value.totalResults, 0)

        return {
            articles,
            totalResults,
            page: params?.page ?? 1,
            pageSize: params?.pageSize ?? articles.length,
        }
    }

    public async getSources(params?: SourceParams): Promise<NewsSource[]> {
        const lists = await Promise.all(this.repos.map(r => r.getSources(params)))
        const all = lists.flat()
        const map = new Map<string, NewsSource>()
        all.forEach(src => map.set(src.id, src))
        return Array.from(map.values())
    }
}

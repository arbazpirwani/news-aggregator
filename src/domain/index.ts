export type { Article, Source, ArticleCollection } from './entities/Article';
export type { UserPreferences } from './entities/UserPreferences';
export { Category, Country, Language } from './entities/UserPreferences';

export type {
    NewsRepository,
    HeadlinesParams,
    SearchParams,
    PaginationParams,
    SourceParams,
    NewsSource,
} from './repositories/NewsRepository';

export { GetTopHeadlinesUseCase } from './usecases/GetTopHeadlinesUseCase';
export { SearchArticlesUseCase } from './usecases/SearchArticlesUseCase';
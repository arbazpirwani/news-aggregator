import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type {
    SearchParams,
    ArticleCollection
} from '../../domain/repositories/NewsRepository';
import { useDependencies } from '../context/DependencyContext';

export function useSearchArticles(
    params: SearchParams,
    options?: UseQueryOptions<ArticleCollection, Error>
) {
    const { searchArticlesUseCase } = useDependencies();

    return useQuery<ArticleCollection, Error>({
        queryKey: ['searchArticles', params],
        queryFn: () => searchArticlesUseCase.execute(params),
        ...options,
    });
}

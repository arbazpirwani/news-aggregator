import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type {
    HeadlinesParams,
    ArticleCollection
} from '../../domain/repositories/NewsRepository';
import { useDependencies } from '../context/DependencyContext';

export function useTopHeadlines(
    params: HeadlinesParams,
    options?: UseQueryOptions<ArticleCollection, Error>
) {
    const { getTopHeadlinesUseCase } = useDependencies();

    return useQuery<ArticleCollection, Error>({
        queryKey: ['topHeadlines', params],
        queryFn: () => getTopHeadlinesUseCase.execute(params ?? {}),
        ...options,
    });
}

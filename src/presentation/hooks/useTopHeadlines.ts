import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';
import { HeadlinesParams } from '../../domain/repositories/NewsRepository';
import { ArticleCollection } from '../../domain/entities/Article';

/**
 * Custom hook for fetching top headlines
 * Similar to a ViewModel in Android MVVM
 */
export function useTopHeadlines(params?: HeadlinesParams) {
    const { getTopHeadlinesUseCase } = useDependencies();

    return useQuery<ArticleCollection, Error>({
        queryKey: ['headlines', params],
        queryFn: () => getTopHeadlinesUseCase.execute(params),
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    });
}

/**
 * Hook state includes:
 * - data: ArticleCollection | undefined
 * - isLoading: boolean
 * - isError: boolean
 * - error: Error | null
 * - refetch: () => void
 * - isRefetching: boolean
 */
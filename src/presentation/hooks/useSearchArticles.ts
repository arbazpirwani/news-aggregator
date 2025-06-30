import { useQuery } from '@tanstack/react-query';
import { useDependencies } from '../context/DependencyContext';
import { SearchParams } from '../../domain/repositories/NewsRepository';
import { ArticleCollection } from '../../domain/entities/Article';

/**
 * Custom hook for searching articles
 */
export function useSearchArticles(params: SearchParams | null) {
    const { searchArticlesUseCase } = useDependencies();

    return useQuery<ArticleCollection, Error>({
        queryKey: ['search', params],
        queryFn: () => {
            if (!params) {
                throw new Error('Search parameters are required');
            }
            return searchArticlesUseCase.execute(params);
        },
        enabled: !!params && !!params.query, // Only run if we have search params
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
}
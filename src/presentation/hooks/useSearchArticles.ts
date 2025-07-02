import { useQuery } from '@tanstack/react-query'
import { useDependencies } from '../context/DependencyContext'
import type { Category, Country } from '../../domain/entities/UserPreferences'

export function useSearchArticles(
    searchQuery: string,
    category?: Category,
    country?: Country,
    page = 1
) {
    const { searchArticlesUseCase } = useDependencies()

    return useQuery({
        queryKey: ['searchArticles', { searchQuery, category, country, page }],
        queryFn: () =>
            searchArticlesUseCase.execute({
                query: searchQuery,
                category,
                country,
                page,
            }),
        enabled: !!searchQuery,
        keepPreviousData: true,
    })
}

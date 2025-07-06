import { useQuery } from '@tanstack/react-query'
import type { Category, Country } from '../../domain'
import {useDependencies} from "../../context/DependencyContext";

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

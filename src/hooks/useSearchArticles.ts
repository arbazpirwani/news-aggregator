import {useQuery} from '@tanstack/react-query'
import {useDependencies} from './useDependencies'
import type {ArticleCollection} from '../domain'

/**
 * Hook to search articles via the “everything” endpoint.
 * Only accepts query + pagination + optional from/to dates.
 */
export function useSearchArticles(
    query: string,
    page: number = 1,
    from?: string,
    to?: string
) {
    const {searchArticlesUseCase} = useDependencies()

    return useQuery<ArticleCollection, Error>({
        queryKey: ['searchArticles', {query, page, from, to}],
        queryFn: () =>
            searchArticlesUseCase.execute({
                query,
                page,
                from,
                to,
            }),
        enabled: query.trim().length > 0,
    })
}

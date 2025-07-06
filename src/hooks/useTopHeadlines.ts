import {useQuery} from '@tanstack/react-query'
import type {Category, Country} from '../domain'
import {useDependencies} from "./useDependencies";

export function useTopHeadlines(
    category?: Category,
    country?: Country,
    page = 1
) {
    const {getTopHeadlinesUseCase} = useDependencies()

    return useQuery({
        queryKey: ['topHeadlines', {category, country, page}],
        queryFn: () =>
            getTopHeadlinesUseCase.execute({category, country, page}),
        keepPreviousData: true,
    })
}

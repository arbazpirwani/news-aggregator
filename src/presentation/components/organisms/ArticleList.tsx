import * as React from 'react'
import { Spinner } from '../atoms/Spinner'
import { ArticleCard } from './ArticleCard'
import type { Article } from '../../../domain'

interface ArticleListProps {
    articles: Article[]
    isLoading: boolean
    emptyMessage?: string
}

export function ArticleList({
                                articles,
                                isLoading,
                                emptyMessage = 'No articles found',
                            }: ArticleListProps) {
    if (isLoading) return <Spinner />

    // Ensure sorted by date descending
    const sorted = [...articles].sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    if (!sorted.length) {
        return <div className="text-center text-gray-500 py-8">{emptyMessage}</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sorted.map((a) => (
                <ArticleCard key={a.id} article={a} />
            ))}
        </div>
    )
}

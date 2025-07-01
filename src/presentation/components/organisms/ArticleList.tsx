import type { Article } from '../../../domain/entities/Article';
import { ArticleCard } from '../molecules/ArticleCard';
import { Spinner } from '../atoms/Spinner';

interface ArticleListProps {
    articles: Article[];
    isLoading?: boolean;
    error?: Error | null;
    emptyMessage?: string;
}

export function ArticleList({
                                articles,
                                isLoading = false,
                                error = null,
                                emptyMessage = 'No articles found'
                            }: ArticleListProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-600 text-lg">{error.message}</p>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleCard key={article.url} article={article} />
            ))}
        </div>
    );
}
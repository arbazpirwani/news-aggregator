import type { Article } from '../../../domain/entities/Article';

interface ArticleCardProps {
    article: Article;
    onClick?: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            // Open article in new tab
            window.open(article.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <article
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={handleClick}
        >
            {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        // Hide image if it fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            )}

            <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="font-medium">{article.source.name}</span>
                    <span>•</span>
                    <time>{formatDate(article.publishedAt)}</time>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                </h3>

                {article.description && (
                    <p className="text-gray-600 line-clamp-3">
                        {article.description}
                    </p>
                )}

                {article.author && (
                    <p className="mt-3 text-sm text-gray-500">
                        By {article.author}
                    </p>
                )}
            </div>
        </article>
    );
}
import * as React from "react";
import type { Article } from "../../../domain";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full md:w-48 h-32 object-cover rounded-md"
        />
      ) : (
        <div className="w-full md:w-48 h-32 bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">
            {article.title}
          </h2>
          <span className="text-xs text-gray-500">{article.source.name}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2 flex-1">
          {article.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium hover:underline"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}

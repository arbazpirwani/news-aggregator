/**
 * Data Transfer Objects for NewsAPI.org responses
 * These match the exact API response structure
 */

export interface NewsApiArticleDto {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsApiResponseDto {
    status: string;
    totalResults: number;
    articles: NewsApiArticleDto[];
}

export interface NewsApiSourceDto {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsApiSourcesResponseDto {
    status: string;
    sources: NewsApiSourceDto[];
}

export interface NewsApiErrorDto {
    status: string;
    code: string;
    message: string;
}
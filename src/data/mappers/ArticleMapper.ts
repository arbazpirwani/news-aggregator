import type { Article } from '../../domain/entities/Article';
import type { NewsApiArticleDto } from '../dto/NewsApiDto';
import type { GuardianArticleDto } from '../dto/GuardianApiDto';
import type { NytArticleDto } from '../dto/NytApiDto';

/**
 * Maps different API DTOs to our domain Article entity
 */
export class ArticleMapper {
    /**
     * Map NewsAPI article to domain entity
     */
    static fromNewsApi(dto: NewsApiArticleDto): Article {
        return {
            id: this.generateId(dto.url),
            title: dto.title,
            description: dto.description || '',
            url: dto.url,
            urlToImage: dto.urlToImage || undefined,
            publishedAt: dto.publishedAt,
            source: {
                id: dto.source.id,
                name: dto.source.name,
            },
            author: dto.author || undefined,
            content: dto.content || undefined,
            category: undefined, // NewsAPI doesn't provide category in article
        };
    }

    /**
     * Map Guardian article to domain entity
     */
    static fromGuardian(dto: GuardianArticleDto): Article {
        return {
            id: dto.id,
            title: dto.webTitle,
            description: dto.fields?.trailText || dto.fields?.standfirst || '',
            url: dto.webUrl,
            urlToImage: dto.fields?.thumbnail,
            publishedAt: dto.webPublicationDate,
            source: {
                id: 'the-guardian',
                name: 'The Guardian',
            },
            author: dto.fields?.byline,
            content: dto.fields?.bodyText,
            category: dto.sectionName.toLowerCase(),
        };
    }

    /**
     * Map NYT article to domain entity
     */
    static fromNyt(dto: NytArticleDto): Article {
        const imageUrl = dto.multimedia?.[0]?.url
            ? `https://www.nytimes.com/${dto.multimedia[0].url}`
            : undefined;

        return {
            id: dto._id,
            title: dto.headline.main,
            description: dto.abstract || dto.snippet,
            url: dto.web_url,
            urlToImage: imageUrl,
            publishedAt: dto.pub_date,
            source: {
                id: 'new-york-times',
                name: 'New York Times',
            },
            author: dto.byline?.original,
            content: dto.lead_paragraph,
            category: dto.section_name?.toLowerCase(),
        };
    }

    /**
     * Generate a unique ID from URL
     */
    private static generateId(url: string): string {
        return btoa(url).replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
    }
}
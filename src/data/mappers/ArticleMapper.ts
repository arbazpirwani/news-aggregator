import type { Article } from '../../domain';
import type { NewsApiArticleDto } from '../dto/NewsApiDto';
import type { GuardianArticleDto } from '../dto/GuardianApiDto';
import type { NytArticleDto } from '../dto/NytApiDto';

/**
 * Maps different API DTOs to our domain Article entity
 */
export class ArticleMapper {
    static fromNewsApi(dto: NewsApiArticleDto): Article {
        return {
            id: ArticleMapper.generateId(dto.url),
            title: dto.title,
            description: dto.description ?? '',
            url: dto.url,
            urlToImage: dto.urlToImage ?? undefined,
            publishedAt: dto.publishedAt,
            source: { id: dto.source.id, name: dto.source.name },
            author: dto.author ?? undefined,
            content: dto.content ?? undefined,
            category: undefined,
        };
    }

    static fromGuardian(dto: GuardianArticleDto): Article {
        return {
            id: dto.id,
            title: dto.webTitle,
            description: dto.fields?.trailText ?? dto.fields?.standfirst ?? '',
            url: dto.webUrl,
            urlToImage: dto.fields?.thumbnail ?? undefined,
            publishedAt: dto.webPublicationDate,
            source: { id: 'the-guardian', name: 'The Guardian' },
            author: dto.fields?.byline ?? undefined,
            content: dto.fields?.bodyText ?? undefined,
            category: dto.sectionName.toLowerCase(),
        };
    }

    static fromNyt(dto: NytArticleDto & Record<string, any>): Article {
        const title = dto.headline?.main ?? dto.title ?? '';
        const description = dto.abstract ?? dto.snippet ?? '';
        const url = dto.web_url ?? dto.url ?? '';
        const publishedAt =
            dto.pub_date ?? (dto as any).published_date ?? new Date().toISOString();

        const firstMedia = dto.multimedia?.[0];
        const urlToImage = firstMedia?.url
            ? firstMedia.url.startsWith('http')
                ? firstMedia.url
                : `https://www.nytimes.com/${firstMedia.url}`
            : undefined;

        return {
            id: dto._id ?? dto.uri ?? ArticleMapper.generateId(url),
            title,
            description,
            url,
            urlToImage,
            publishedAt,
            source: { id: 'new-york-times', name: 'New York Times' },
            author: dto.byline?.original ?? undefined,
            content: dto.lead_paragraph ?? undefined,
            category: dto.section_name?.toLowerCase() ?? undefined,
        };
    }

    private static generateId(url: string): string {
        return btoa(url).replace(/[^a-zA-Z0-9]/g, '');
    }
}

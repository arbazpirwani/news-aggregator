/**
 * Data Transfer Objects for The Guardian API responses
 */

export interface GuardianArticleDto {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    isHosted: boolean;
    pillarId?: string;
    pillarName?: string;
    fields?: {
        headline?: string;
        standfirst?: string;
        trailText?: string;
        byline?: string;
        main?: string;
        body?: string;
        thumbnail?: string;
        bodyText?: string;
    };
}

export interface GuardianResponseDto {
    response: {
        status: string;
        userTier: string;
        total: number;
        startIndex: number;
        pageSize: number;
        currentPage: number;
        pages: number;
        orderBy: string;
        results: GuardianArticleDto[];
    };
}

export interface GuardianSectionDto {
    id: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    editions: Array<{
        id: string;
        webTitle: string;
        webUrl: string;
        apiUrl: string;
        code: string;
    }>;
}
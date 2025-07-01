/**
 * Data Transfer Objects for New York Times API responses
 */

export interface NytArticleDto {
    abstract: string;
    web_url: string;
    snippet: string;
    lead_paragraph: string;
    print_section?: string;
    print_page?: string;
    source: string;
    multimedia: Array<{
        rank: number;
        subtype: string;
        caption?: string;
        credit?: string;
        type: string;
        url: string;
        height: number;
        width: number;
        legacy?: {
            xlarge?: string;
            xlargewidth?: number;
            xlargeheight?: number;
        };
        subType: string;
        crop_name: string;
    }>;
    headline: {
        main: string;
        kicker?: string;
        content_kicker?: string;
        print_headline?: string;
        name?: string;
        seo?: string;
        sub?: string;
    };
    keywords: Array<{
        name: string;
        value: string;
        rank: number;
        major: string;
    }>;
    pub_date: string;
    document_type: string;
    news_desk: string;
    section_name: string;
    subsection_name?: string;
    byline: {
        original?: string;
        person: Array<{
            firstname: string;
            middlename?: string;
            lastname: string;
            qualifier?: string;
            title?: string;
            role: string;
            organization: string;
            rank: number;
        }>;
        organization?: string;
    };
    type_of_material: string;
    _id: string;
    word_count: number;
    uri: string;
}

export interface NytResponseDto {
    status: string;
    copyright: string;
    response: {
        docs: NytArticleDto[];
        meta: {
            hits: number;
            offset: number;
            time: number;
        };
    };
}
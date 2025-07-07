export enum Provider {
    NEWSAPI = 'newsapi',
    GUARDIAN = 'guardian',
    NYTIMES = 'nytimes',
}

export const ALL_PROVIDERS = [
    {id: Provider.NEWSAPI, label: 'NewsAPI'},
    {id: Provider.GUARDIAN, label: 'The Guardian'},
    {id: Provider.NYTIMES, label: 'New York Times'},
]

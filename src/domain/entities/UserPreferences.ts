/**
 * User preferences for personalized news feed
 */
export interface UserPreferences {
  id: string;
  preferredSources: string[];
  preferredCategories: Category[];
  preferredAuthors: string[];
  language?: string;
  country?: string;
}

/**
 * Supported news categories
 */
export enum Category {
  BUSINESS = "business",
  ENTERTAINMENT = "entertainment",
  GENERAL = "general",
  HEALTH = "health",
  SCIENCE = "science",
  SPORTS = "sports",
  TECHNOLOGY = "technology",
}

/**
 * Supported countries for news
 */
export enum Country {
  US = "us",
  GB = "gb",
  CA = "ca",
  AU = "au",
  IN = "in",
}

/**
 * Supported languages
 */
export enum Language {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserPreferences, Category } from '../../domain/entities/UserPreferences';

interface PreferencesState {
    preferences: Partial<UserPreferences>;
    updatePreferences: (prefs: Partial<UserPreferences>) => void;
    toggleSource: (sourceId: string) => void;
    toggleCategory: (category: Category) => void;
    clearPreferences: () => void;
}

/**
 * Global preferences store using Zustand
 * Persisted to localStorage
 */
export const usePreferences = create<PreferencesState>()(
    persist(
        (set) => ({
            preferences: {
                preferredSources: [],
                preferredCategories: [],
                preferredAuthors: [],
            },

            updatePreferences: (prefs) =>
                set((state) => ({
                    preferences: { ...state.preferences, ...prefs },
                })),

            toggleSource: (sourceId) =>
                set((state) => {
                    const sources = state.preferences.preferredSources || [];
                    const newSources = sources.includes(sourceId)
                        ? sources.filter(id => id !== sourceId)
                        : [...sources, sourceId];

                    return {
                        preferences: {
                            ...state.preferences,
                            preferredSources: newSources,
                        },
                    };
                }),

            toggleCategory: (category) =>
                set((state) => {
                    const categories = state.preferences.preferredCategories || [];
                    const newCategories = categories.includes(category)
                        ? categories.filter(cat => cat !== category)
                        : [...categories, category];

                    return {
                        preferences: {
                            ...state.preferences,
                            preferredCategories: newCategories,
                        },
                    };
                }),

            clearPreferences: () =>
                set({
                    preferences: {
                        preferredSources: [],
                        preferredCategories: [],
                        preferredAuthors: [],
                    },
                }),
        }),
        {
            name: 'news-preferences',
        }
    )
);
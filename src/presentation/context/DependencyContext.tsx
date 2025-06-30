import { createContext, useContext, ReactNode, useMemo } from 'react';
import { NewsRepository } from '../../domain/repositories/NewsRepository';
import { NewsRepositoryImpl } from '../../data/repositories/NewsRepositoryImpl';
import { GetTopHeadlinesUseCase } from '../../domain/usecases/GetTopHeadlinesUseCase';
import { SearchArticlesUseCase } from '../../domain/usecases/SearchArticlesUseCase';

/**
 * Dependency Injection Container
 * Similar to Dagger/Hilt in Android
 */
interface Dependencies {
    // Repositories
    newsRepository: NewsRepository;

    // Use Cases
    getTopHeadlinesUseCase: GetTopHeadlinesUseCase;
    searchArticlesUseCase: SearchArticlesUseCase;
}

const DependencyContext = createContext<Dependencies | null>(null);

interface DependencyProviderProps {
    children: ReactNode;
}

export function DependencyProvider({ children }: DependencyProviderProps) {
    const dependencies = useMemo<Dependencies>(() => {
        // Create repository instances
        const newsRepository = new NewsRepositoryImpl();

        // Create use case instances
        const getTopHeadlinesUseCase = new GetTopHeadlinesUseCase(newsRepository);
        const searchArticlesUseCase = new SearchArticlesUseCase(newsRepository);

        return {
            newsRepository,
            getTopHeadlinesUseCase,
            searchArticlesUseCase,
        };
    }, []);

    return (
        <DependencyContext.Provider value={dependencies}>
            {children}
        </DependencyContext.Provider>
    );
}

/**
 * Hook to access dependencies
 */
export function useDependencies(): Dependencies {
    const context = useContext(DependencyContext);
    if (!context) {
        throw new Error('useDependencies must be used within DependencyProvider');
    }
    return context;
}
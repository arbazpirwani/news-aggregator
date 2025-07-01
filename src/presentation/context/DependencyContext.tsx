import {createContext, useContext, ReactNode, useMemo} from 'react';
import type {NewsRepository} from '../../domain/repositories/NewsRepository';
import {NewsRepositoryImpl} from '../../data/repositories/NewsRepositoryImpl';
import {GuardianRepositoryImpl} from '../../data/repositories/GuardianRepositoryImpl';
import {NytRepositoryImpl} from '../../data/repositories/NytRepositoryImpl';
import {CompositeNewsRepository} from '../../data/repositories/CompositeNewsRepository';
import {GetTopHeadlinesUseCase} from '../../domain/usecases/GetTopHeadlinesUseCase';
import {SearchArticlesUseCase} from '../../domain/usecases/SearchArticlesUseCase';

interface Dependencies {
    // Aggregated repository for all three sources
    newsRepository: NewsRepository;

    // Use-case instances
    getTopHeadlinesUseCase: GetTopHeadlinesUseCase;
    searchArticlesUseCase: SearchArticlesUseCase;
}

const DependencyContext = createContext<Dependencies | null>(null);

interface DependencyProviderProps {
    children: ReactNode;
}

export function DependencyProvider({children}: DependencyProviderProps) {
    const dependencies = useMemo<Dependencies>(() => {
        // 1) Instantiate each REST client–backed repository
        const newsApiRepo = new NewsRepositoryImpl();       // NewsAPI.org
        const guardianRepo = new GuardianRepositoryImpl();   // The Guardian API
        const nytRepo = new NytRepositoryImpl();        // NYT Top Stories + Article Search

        // 2) Compose them into a single aggregate
        const newsRepository = new CompositeNewsRepository([
            newsApiRepo,
            guardianRepo,
            nytRepo,
        ]);

        // 3) Create your use-cases against that composite
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
 * Custom hook to pull our DI container out of React context.
 * Throws if you forget to wrap your tree in <DependencyProvider>.
 */
export function useDependencies(): Dependencies {
    const context = useContext(DependencyContext);
    if (!context) {
        throw new Error('useDependencies must be used within DependencyProvider');
    }
    return context;
}

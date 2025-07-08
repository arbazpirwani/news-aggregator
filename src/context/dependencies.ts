import { createContext } from "react";
import { CompositeNewsRepository } from "../data/repositories/CompositeNewsRepository";
import { GetTopHeadlinesUseCase, SearchArticlesUseCase } from "../domain";
import type { NewsRepository } from "../domain";

/** 1) Compose a single aggregate repository */
const newsRepository: NewsRepository = new CompositeNewsRepository();

/** 2) Instantiate your use-cases */
const getTopHeadlinesUseCase = new GetTopHeadlinesUseCase(newsRepository);
const searchArticlesUseCase = new SearchArticlesUseCase(newsRepository);

export interface Dependencies {
  newsRepository: NewsRepository;
  getTopHeadlinesUseCase: GetTopHeadlinesUseCase;
  searchArticlesUseCase: SearchArticlesUseCase;
}

/** default dependencies object */
export const defaultDependencies: Dependencies = {
  newsRepository,
  getTopHeadlinesUseCase,
  searchArticlesUseCase,
};

/** the React Context itself */
export const DependencyContext =
  createContext<Dependencies>(defaultDependencies);

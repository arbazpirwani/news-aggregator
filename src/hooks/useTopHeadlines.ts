import { useQuery } from "@tanstack/react-query";
import { useDependencies } from "./useDependencies";
import type { Provider } from "../domain/entities/Provider";
import type { ArticleCollection, Category, Country } from "../domain";

export function useTopHeadlines(
  provider?: Provider,
  category?: Category,
  country?: Country,
  page: number = 1,
) {
  const { getTopHeadlinesUseCase } = useDependencies();

  return useQuery<ArticleCollection, Error>({
    queryKey: ["topHeadlines", { provider, category, country, page }],
    queryFn: () =>
      getTopHeadlinesUseCase.execute({
        provider: provider as string | undefined,
        category,
        country,
        page,
      }),
  });
}

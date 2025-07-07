import { useQuery } from "@tanstack/react-query";
import { useDependencies } from "./useDependencies";
import type { NewsSource } from "../domain";

/**
 * Hook to fetch available news sources.
 */
export function useSources() {
  const { newsRepository } = useDependencies();

  return useQuery<NewsSource[], Error>(
    ["sources"],
    () => newsRepository.getSources(),
    {
      staleTime: 1000 * 60 * 10, // cache for 10 minutes
    },
  );
}

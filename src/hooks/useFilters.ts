import { useState, useCallback } from "react";
import { Category, Country } from "../domain";

export interface FilterState {
  category?: Category;
  country?: Country;
  sources?: string[];
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Custom hook for managing filter state
 */
export function useFilters(initialFilters?: FilterState) {
  const [filters, setFilters] = useState<FilterState>(initialFilters || {});

  const updateFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const clearFilter = useCallback((key: keyof FilterState) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  return {
    filters,
    updateFilter,
    clearFilters,
    clearFilter,
    hasActiveFilters: Object.keys(filters).length > 0,
  };
}

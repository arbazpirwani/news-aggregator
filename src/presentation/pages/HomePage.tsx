import { useState } from "react";
import { FilterSection } from "../components/organisms/FilterSection";
import { ArticleList } from "../components/organisms/ArticleList";
import { Pagination } from "../components/molecules/Pagination";
import { useTopHeadlines } from "../../hooks/useTopHeadlines";
import type { Category, Country } from "../../domain/entities/UserPreferences";
import type { Provider } from "../../domain/entities/Provider";

export default function HomePage() {
  const [provider, setProvider] = useState<Provider>();
  const [category, setCategory] = useState<Category>();
  const [country, setCountry] = useState<Country>();
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useTopHeadlines(
    provider,
    category,
    country,
    page,
  );

  const handleClear = () => {
    setProvider(undefined);
    setCategory(undefined);
    setCountry(undefined);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <FilterSection
          provider={provider}
          onProviderChange={(p) => {
            setProvider(p);
            setPage(1);
          }}
          selectedCategory={category}
          selectedCountry={country}
          onCategoryChange={(c) => {
            setCategory(c);
            setPage(1);
          }}
          onCountryChange={(c) => {
            setCountry(c);
            setPage(1);
          }}
          onClearFilters={handleClear}
        />

        {error && <div className="text-red-600">Error: {error.message}</div>}

        <ArticleList articles={data?.articles ?? []} isLoading={isLoading} />

        <Pagination
          hasPrev={page > 1}
          hasNext={!!data?.articles?.length}
          onPrev={() => setPage((p) => p - 1)}
          onNext={() => setPage((p) => p + 1)}
        />
      </main>
    </div>
  );
}

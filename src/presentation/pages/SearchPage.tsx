import { useState } from "react";
import { SearchFilters } from "../components/organisms/SearchFilters";
import { ArticleList } from "../components/organisms/ArticleList";
import { Pagination } from "../components/molecules/Pagination";
import { useSearchArticles } from "../../hooks";
import { debounce } from "../../utils";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [startDate, endDate] = dateRange;
  const from = startDate?.toISOString().split("T")[0];
  const to = endDate?.toISOString().split("T")[0];

  const { data, isLoading, error } = useSearchArticles(
    searchQuery,
    page,
    from,
    to,
  );
  const articles = data?.articles ?? [];

  // debounce so we don’t hammer the API on every keystroke
  const handleSearch = debounce((q: string) => {
    setSearchQuery(q);
    setPage(1);
  }, 500);

  const handleRaw = (
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => e?.preventDefault();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <SearchFilters
          searchQuery={searchQuery}
          onSearch={handleSearch}
          dateRange={dateRange}
          onDateChange={setDateRange}
          handleRaw={handleRaw}
        />

        {error && <div className="text-red-600">Error: {error.message}</div>}

        <ArticleList articles={articles} isLoading={isLoading} />

        {articles.length > 0 && (
          <Pagination
            hasPrev={page > 1}
            hasNext={articles.length > 0}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => p + 1)}
          />
        )}
      </main>
    </div>
  );
}

import { SearchBar } from "../molecules/SearchBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SearchFiltersProps {
  searchQuery: string;
  onSearch: (q: string) => void;
  dateRange: [Date | null, Date | null];
  onDateChange: (range: [Date | null, Date | null]) => void;
  handleRaw: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchFilters({
  searchQuery,
  onSearch,
  dateRange,
  onDateChange,
  handleRaw,
}: SearchFiltersProps) {
  const [startDate, endDate] = dateRange;
  return (
    <div className="flex bg-white shadow p-6 w-full gap-2">
      <SearchBar
        onSearch={onSearch}
        initialValue={searchQuery}
        placeholder="Search anything here..."
        className="flex-1"
      />

      <DatePicker
        selectsRange
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        onChange={(upd) => onDateChange(upd)}
        isClearable
        onChangeRaw={handleRaw}
        placeholderText="Select date range"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}

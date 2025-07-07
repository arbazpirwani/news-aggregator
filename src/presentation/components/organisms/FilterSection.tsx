import { FilterPanel } from "./FilterPanel";
import { ProviderSelector } from "../molecules/ProviderSelector";
import type { Category, Country } from "../../../domain";
import type { Provider } from "../../../domain/entities/Provider";

interface FilterSectionProps {
  provider?: Provider;
  onProviderChange: (p?: Provider) => void;
  selectedCategory?: Category;
  selectedCountry?: Country;
  onCategoryChange: (c?: Category) => void;
  onCountryChange: (c?: Country) => void;
  onClearFilters: () => void;
}

export function FilterSection({
  provider,
  onProviderChange,
  selectedCategory,
  selectedCountry,
  onCategoryChange,
  onCountryChange,
  onClearFilters,
}: FilterSectionProps) {
  return (
    <div className="bg-white rounded-md shadow p-6 space-y-4">
      <FilterPanel
        selectedCategory={selectedCategory}
        selectedCountry={selectedCountry}
        onCategoryChange={onCategoryChange}
        onCountryChange={onCountryChange}
        onClearFilters={onClearFilters}
      />
      <ProviderSelector provider={provider} onChange={onProviderChange} />
    </div>
  );
}

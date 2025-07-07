import * as React from 'react'
import { Category, Country } from '../../../domain'
import { Button } from '../atoms/Button'
import {FilterChip} from "../atoms/FilterChip.tsx";

interface FilterPanelProps {
    selectedCategory?: Category
    selectedCountry?: Country
    onCategoryChange: (category?: Category) => void
    onCountryChange: (country?: Country) => void
    onClearFilters: () => void
}

export function FilterPanel({
                                selectedCategory,
                                selectedCountry,
                                onCategoryChange,
                                onCountryChange,
                                onClearFilters,
                            }: FilterPanelProps) {
    const categories = [
        { value: Category.BUSINESS,      label: 'Business' },
        { value: Category.ENTERTAINMENT, label: 'Entertainment' },
        { value: Category.GENERAL,       label: 'General' },
        { value: Category.HEALTH,        label: 'Health' },
        { value: Category.SCIENCE,       label: 'Science' },
        { value: Category.SPORTS,        label: 'Sports' },
        { value: Category.TECHNOLOGY,    label: 'Technology' },
    ]

    const countries = [
        { value: Country.US, label: 'United States' },
        { value: Country.GB, label: 'United Kingdom' },
        { value: Country.CA, label: 'Canada' },
        { value: Country.AU, label: 'Australia' },
        { value: Country.IN, label: 'India' },
    ]

    const hasActiveFilters = Boolean(selectedCategory || selectedCountry)

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                {hasActiveFilters && (
                    <Button variant="outline" size="sm" onClick={onClearFilters}>
                        Clear All
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {/* Category selection */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <FilterChip
                                key={cat.value}
                                label={cat.label}
                                active={selectedCategory === cat.value}
                                onClick={() =>
                                    onCategoryChange(
                                        selectedCategory === cat.value ? undefined : cat.value
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* Country selection */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Country</h4>
                    <div className="flex flex-wrap gap-2">
                        {countries.map((c) => (
                            <FilterChip
                                key={c.value}
                                label={c.label}
                                active={selectedCountry === c.value}
                                onClick={() =>
                                    onCountryChange(
                                        selectedCountry === c.value ? undefined : c.value
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

import { useState, useEffect, FormEvent } from 'react'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
    initialValue?: string
}

export function SearchBar({
                              onSearch,
                              placeholder = 'Search articles...',
                              initialValue = ''
                          }: SearchBarProps) {
    const [query, setQuery] = useState(initialValue)

    // reset input when initialValue (i.e. searchQuery in App) changes
    useEffect(() => {
        setQuery(initialValue)
    }, [initialValue])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query.trim())
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1">
                <Input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full"
                />
            </div>
            <Button type="submit" variant="primary">
                Search
            </Button>
        </form>
    )
}

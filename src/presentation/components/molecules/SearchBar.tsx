import * as React from 'react'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'

interface SearchBarProps {
    initialValue?: string
    placeholder?: string
    onSearch: (query: string) => void
    className?: string
}

export function SearchBar({
                              initialValue = '',
                              placeholder = 'Search…',
                              onSearch,
                              className = '',
                          }: SearchBarProps) {
    const [value, setValue] = React.useState(initialValue)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(value.trim())
    }

    return (
        <form onSubmit={handleSubmit} className={`${className} flex gap-2`}>
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="flex-1"
            />
            <Button type="submit" variant="primary">Go</Button>
        </form>
    )
}

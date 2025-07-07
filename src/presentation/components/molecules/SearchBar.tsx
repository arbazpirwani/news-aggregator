import {Input} from '../atoms/Input'

interface SearchBarProps {
    initialValue?: string
    placeholder?: string
    onSearch: (query: string) => void
    className?: string
}

export function SearchBar({
                              placeholder = 'Search…',
                              onSearch,
                          }: SearchBarProps) {

    return (
        <Input
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
        />

    )
}

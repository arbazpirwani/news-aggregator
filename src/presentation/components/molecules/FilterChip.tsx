interface FilterChipProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
    return (
        <button
            onClick={onClick}
            className={`
        px-4 py-2 rounded-full text-sm font-medium transition-colors
        ${
                isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
      `}
        >
            {label}
        </button>
    );
}
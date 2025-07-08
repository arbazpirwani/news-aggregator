interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

export function FilterChip({ active, onClick, label }: FilterChipProps) {
  const base = "px-3 py-1 rounded-full font-medium shadow-sm cursor-pointer";
  const style = active
    ? "bg-blue-500 text-white"
    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
  return (
    <button className={`${base} ${style}`} onClick={onClick}>
      {label}
    </button>
  );
}

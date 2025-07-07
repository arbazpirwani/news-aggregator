import { ALL_PROVIDERS, Provider } from "../../../domain/entities/Provider";

interface ProviderSelectorProps {
  provider?: Provider;
  onChange: (p?: Provider) => void;
}

export function ProviderSelector({
  provider,
  onChange,
}: ProviderSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <label className="font-medium text-gray-700">Provider:</label>
      <select
        value={provider ?? ""}
        onChange={(e) => onChange((e.target.value as Provider) || undefined)}
        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="">All</option>
        {ALL_PROVIDERS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}

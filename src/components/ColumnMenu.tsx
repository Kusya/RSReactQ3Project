import {
  type DetailColumn,
  type DetailColumnKey,
} from './../types/DetailColumns';

interface ColumnMenuProps {
  columns: DetailColumn[];
  visibleCols: DetailColumnKey[];
  onChange: (newVisible: DetailColumnKey[]) => void;
  onClose: () => void;
}

export function ColumnMenu({
  columns,
  visibleCols,
  onChange,
  onClose,
}: ColumnMenuProps) {
  function toggleColumn(colKey: DetailColumnKey) {
    onChange(
      visibleCols.includes(colKey)
        ? visibleCols.filter((k) => k !== colKey)
        : [...visibleCols, colKey]
    );
  }

  return (
    <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 p-2">
      <p className="text-xs font-semibold mb-1">Toggle columns</p>
      {columns.map((col) => (
        <label key={col.key} className="flex items-center gap-2 text-xs py-0.5">
          <input
            type="checkbox"
            checked={visibleCols.includes(col.key)}
            onChange={() => toggleColumn(col.key)}
            className="rounded border-gray-300"
          />
          {col.label}
        </label>
      ))}
      <button
        onClick={onClose}
        className="mt-2 w-full text-xs py-1 border border-gray-300 rounded hover:bg-gray-100"
      >
        Close
      </button>
    </div>
  );
}

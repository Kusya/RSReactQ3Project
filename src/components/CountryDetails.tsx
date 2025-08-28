import { useState } from 'react';
import { NO_VALUE } from '../assets/const';
import type { ParsedCountry, YearlyRecord } from '../types/Country';
import {
  ALL_DETAILS_COLUMNS,
  type DetailColumnKey,
} from '../types/DetailColumns';

interface CountryDetailsProps {
  country: ParsedCountry;
}

export default function CountryDetails({ country }: CountryDetailsProps) {
  const [visibleCols, setVisibleCols] = useState<DetailColumnKey[]>([
    ALL_DETAILS_COLUMNS[0].key,
    ALL_DETAILS_COLUMNS[1].key,
    ALL_DETAILS_COLUMNS[2].key,
  ]);

  function toggleColumn(colKey: DetailColumnKey) {
    setVisibleCols((prev) =>
      prev.includes(colKey)
        ? prev.filter((k) => k !== colKey)
        : [...prev, colKey]
    );
  }
  return (
    <tr>
      <td colSpan={4} className="p-0 border">
        <div className="bg-gray-50 p-4 max-h-80 overflow-auto">
          <div className="flex items-center gap-4 mb-3">
            {ALL_DETAILS_COLUMNS.map((col) => (
              <label key={col.key} className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={visibleCols.includes(col.key)}
                  onChange={() => toggleColumn(col.key)}
                  className="rounded border-gray-300"
                />
                {col.label}
              </label>
            ))}
          </div>
          <table className="min-w-full border text-xs">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 border">Year</th>
                {visibleCols.map((col) => (
                  <th key={col} className="px-2 py-1 border">
                    {ALL_DETAILS_COLUMNS.find((c) => c.key === col)?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {country.details.map((detail) => (
                <tr key={detail.year}>
                  <td className="px-2 py-1 border">{detail.year}</td>
                  {visibleCols.map((col: keyof YearlyRecord) => (
                    <td
                      key={col + '-' + detail.year}
                      className="px-2 py-1 border"
                    >
                      {detail[col]?.toLocaleString() ?? NO_VALUE}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
}

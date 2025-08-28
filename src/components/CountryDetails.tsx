import { useEffect, useRef, useState } from 'react';
import { NO_VALUE } from '../assets/const';
import type { ParsedCountry, YearlyRecord } from '../types/Country';
import {
  ALL_DETAILS_COLUMNS as columns,
  type DetailColumnKey,
} from '../types/DetailColumns';
import { ColumnMenu } from './ColumnMenu';

interface CountryDetailsProps {
  country: ParsedCountry;
}

export default function CountryDetails({ country }: CountryDetailsProps) {
  const [visibleCols, setVisibleCols] = useState<DetailColumnKey[]>([
    columns[0].key,
    columns[1].key,
    columns[2].key,
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <tr>
      <td colSpan={4} className="p-0 border">
        <div className="bg-gray-50 p-4 max-h-80 overflow-auto">
          <table className="min-w-full border text-xs">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 border">Year</th>
                {visibleCols.map((col) => (
                  <th key={col} className="px-2 py-1 border">
                    {columns.find((c) => c.key === col)?.label}
                  </th>
                ))}
                <th
                  className="px-2 py-1 border text-right relative"
                  ref={menuRef}
                >
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="text-gray-600 bg-transparent hover:text-gray-900 px-1"
                  >
                    ☰
                  </button>
                  {menuOpen && (
                    <ColumnMenu
                      columns={columns}
                      visibleCols={visibleCols}
                      onChange={setVisibleCols}
                      onClose={() => setMenuOpen(false)}
                    />
                  )}
                </th>
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
                  <td className="px-2 py-1 border"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
}

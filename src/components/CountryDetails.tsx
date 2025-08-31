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
  highlight: number | null;
}

export default function CountryDetails({
  country,
  highlight,
}: CountryDetailsProps) {
  const [visibleCols, setVisibleCols] = useState<DetailColumnKey[]>([
    columns[0].key,
    columns[1].key,
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
      <td colSpan={4} className="p-0 ">
        <div className="p-1 max-h-80 overflow-auto border-gray-400 border-b-1">
          <table className="min-w-full text-xs">
            <thead>
              <tr>
                <th className="px-2 py-1">Year</th>
                <th className="px-2 py-1">Population</th>

                {visibleCols.map((col) => (
                  <th key={col} className="px-2 py-1">
                    {columns.find((c) => c.key === col)?.label}
                  </th>
                ))}
                <th className="px-2 py-1 w-16" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="bg-transparent  px-1"
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
                <tr
                  key={detail.year}
                  className={highlight === detail.year ? 'selected' : ''}
                >
                  <td className="px-2 py-1">{detail.year}</td>
                  <td className="px-2 py-1">
                    <div
                      className={
                        highlight === detail.year && detail.population
                          ? 'border-2 border-green-500'
                          : ''
                      }
                    >
                      {detail.population?.toLocaleString() ?? NO_VALUE}
                    </div>
                  </td>
                  {visibleCols.map((col: keyof YearlyRecord) => (
                    <td key={col + '-' + detail.year} className="px-2 py-1 ">
                      {detail[col]?.toLocaleString() ?? NO_VALUE}
                    </td>
                  ))}
                  <td className="px-2 py-1" />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
}

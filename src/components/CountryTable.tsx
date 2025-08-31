import type { ParsedCountry, SortDirection, SortKey } from '../types/Country';
import { countryDataResource } from '../service/countryDataResource';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CountryRow } from './CountryRow';

export default function CountryTable() {
  const countries = useMemo(
    () => countryDataResource.read() as ParsedCountry[],
    []
  );

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const allYears = useMemo(() => {
    const years = new Set<number>();
    countries.forEach((c) => {
      c.details.forEach((d) => years.add(d.year));
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [countries]);
  if (selectedYear === null && allYears.length > 0) {
    setSelectedYear(allYears[0]);
  }
  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const toggleSort = useCallback(
    (key: SortKey) => {
      setSortDirection((prevDir) => {
        if (sortKey === key) {
          return prevDir === 'asc' ? 'desc' : 'asc';
        }
        return 'asc';
      });
      setSortKey(key);
    },
    [sortKey]
  );

  useEffect(() => {
    const ids = new Set(countries.map((c) => c.isoCode ?? c.name));
    setHighlighted(ids);
    const timer = setTimeout(() => setHighlighted(new Set()), 800);
    return () => clearTimeout(timer);
  }, [selectedYear, countries]);

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter((c) => {
      const nameMatch = c.name.toLowerCase().includes(query);
      const isoMatch = (c.isoCode ?? '').toLowerCase().includes(query);
      return nameMatch || isoMatch;
    });
  }, [countries, searchQuery]);

  const sortedCountries = useMemo(() => {
    const sorted = [...filteredCountries].sort((a, b) => {
      if (sortKey === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortKey === 'population') {
        const aPop =
          a.details.find((d) => d.year === selectedYear)?.population ?? 0;
        const bPop =
          b.details.find((d) => d.year === selectedYear)?.population ?? 0;
        return sortDirection === 'asc' ? aPop - bPop : bPop - aPop;
      }
      return 0;
    });
    return sorted;
  }, [filteredCountries, sortKey, sortDirection, selectedYear]);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <select
          value={selectedYear ?? ''}
          onChange={(e) => handleYearChange(Number(e.target.value))}
          className="border-2 border-green-500 rounded px-2 py-1 text-sm"
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
      <div className="overflow-x-auto  rounded">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 py-2 w-6" />
              <th className="px-4 py-2">
                <button
                  onClick={() => toggleSort('name')}
                  className="flex items-center w-full justify-center gap-1 select-none"
                >
                  <span>Name</span>
                  {sortKey === 'name' && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
                </button>
              </th>
              <th className="px-4 py-2">
                <button
                  onClick={() => toggleSort('population')}
                  className="flex items-center w-full justify-center gap-1 select-none"
                >
                  Population ({selectedYear})
                  {sortKey === 'population' && (
                    <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                  )}
                </button>
              </th>
              <th className="px-4 py-2">ISO Code</th>
            </tr>
          </thead>
          <tbody>
            {sortedCountries.map((country) => (
              <CountryRow
                key={country.isoCode ?? country.name + '-fragment'}
                country={country}
                selectedYear={selectedYear}
                highlighted={highlighted}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

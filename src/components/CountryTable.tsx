import type { ParsedCountry } from '../types/Country';
import { countryDataResource } from '../service/countryDataResource';
import { useEffect, useState } from 'react';
import CountryDetails from './CountryDetails';
import { NO_VALUE } from '../assets/const';

export default function CountryTable() {
  const countries = countryDataResource.read() as ParsedCountry[];
  const [expanded, setExpanded] = useState<string | null>(null);

  const allYears = Array.from(
    new Set(countries.flatMap((c) => c.details.map((d) => d.year)))
  ).sort((a, b) => b - a);
  const [selectedYear, setSelectedYear] = useState<number>(allYears[0]);

  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());

  const toggleRow = (isoCode: string) => {
    setExpanded((prev) => (prev === isoCode ? null : isoCode));
  };
  useEffect(() => {
    const ids = new Set(countries.map((c) => c.isoCode ?? c.name));
    setHighlighted(ids);
    const timer = setTimeout(() => setHighlighted(new Set()), 800);
    return () => clearTimeout(timer);
  }, [selectedYear, countries]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 border w-6"></th>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">
                Population ({selectedYear})
              </th>
              <th className="px-4 py-2 border text-left">ISO Code</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => {
              const isOpen =
                expanded === country.isoCode || expanded === country.name;
              const yearData = country.details.find(
                (d) => d.year === selectedYear
              );

              return (
                <>
                  <tr
                    key={country.isoCode}
                    onClick={() => toggleRow(country.isoCode ?? country.name)}
                    className="hover:bg-blue-100 cursor-pointer"
                  >
                    <td className="px-2 py-2 border text-center align-middle">
                      <span
                        className={`inline-block transform transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      >
                        ▶
                      </span>
                    </td>
                    <td className="px-4 py-2 border">{country.name}</td>
                    <td
                      className={`px-4 py-2 border ${highlighted.has(country.isoCode ?? country.name) ? 'highlight' : ''}`}
                    >
                      {yearData?.population?.toLocaleString() ?? NO_VALUE}
                    </td>
                    <td className="px-4 py-2 border">
                      {country.isoCode ?? NO_VALUE}
                    </td>
                  </tr>

                  {isOpen && <CountryDetails country={country} />}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

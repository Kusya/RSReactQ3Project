import type { ParsedCountry } from '../types/Country';
import { countryDataResource } from '../service/countryDataResource';
import { useState } from 'react';
import CountryDetails from './CountryDetails';

export default function CountryTable() {
  const countries = countryDataResource.read() as ParsedCountry[];
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleRow = (isoCode: string) => {
    setExpanded((prev) => (prev === isoCode ? null : isoCode));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border text-left">Name</th>
            <th className="px-4 py-2 border text-left">Population (Latest)</th>
            <th className="px-4 py-2 border text-left">ISO Code</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <>
              <tr
                key={country.isoCode}
                onClick={() => toggleRow(country.isoCode ?? country.name)}
                className="hover:bg-blue-100 cursor-pointer"
              >
                <td className="px-4 py-2 border">{country.name}</td>
                <td className="px-4 py-2 border">
                  {country.latestPopulation?.toLocaleString() ?? '—'}
                </td>
                <td className="px-4 py-2 border">{country.isoCode ?? '—'}</td>
              </tr>

              {(expanded === country.isoCode || expanded === country.name) && (
                <CountryDetails country={country} />
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

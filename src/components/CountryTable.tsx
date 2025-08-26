import { useEffect, useState } from 'react';
import type { ParsedCountry, RawCountry } from '../types/Country';
import CountryTableSkeleton from './CountrySkeletonTable';

export default function CountryTable() {
  const [countries, setCountries] = useState<ParsedCountry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
        );
        type ApiResponse = Record<string, RawCountry>;
        const json = (await res.json()) as ApiResponse;
        const parsed: ParsedCountry[] = Object.entries(json).map(
          ([name, country]: [string, RawCountry]) => {
            const latestPopulation = [...country.data]
              .reverse()
              .find((entry) => entry.population !== undefined)?.population;

            return {
              name,
              isoCode: country.iso_code,
              population: latestPopulation,
            };
          }
        );
        setCountries(parsed);
      } catch (err) {
        console.error('Error loading data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌍 Country Population Table</h1>
      {loading ? (
        <CountryTableSkeleton></CountryTableSkeleton>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">Name</th>
                <th className="px-4 py-2 border text-left">
                  Population (Latest)
                </th>
                <th className="px-4 py-2 border text-left">ISO Code</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c) => (
                <tr key={c.name} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{c.name}</td>
                  <td className="px-4 py-2 border">
                    {c.population?.toLocaleString() ?? '—'}
                  </td>
                  <td className="px-4 py-2 border">{c.isoCode ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

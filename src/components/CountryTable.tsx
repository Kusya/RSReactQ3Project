import type { ParsedCountry } from '../types/Country';
import { countryDataResource } from '../service/countryDataResource';

export default function CountryTable() {
  const countries = countryDataResource.read() as ParsedCountry[];

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
  );
}

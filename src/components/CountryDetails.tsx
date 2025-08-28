import { NO_VALUE } from '../assets/const';
import type { ParsedCountry } from '../types/Country';

interface CountryDetailsProps {
  country: ParsedCountry;
}
export default function CountryDetails({ country }: CountryDetailsProps) {
  return (
    <tr>
      <td colSpan={4} className="p-0 border">
        <div className="bg-gray-50 p-4 max-h-80 overflow-auto">
          <table className="min-w-full border text-xs">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1 border">Year</th>
                <th className="px-2 py-1 border">Population</th>
                <th className="px-2 py-1 border">CO₂</th>
                <th className="px-2 py-1 border">CO₂ per capita</th>
              </tr>
            </thead>
            <tbody>
              {country.details.map((detail) => (
                <tr key={detail.year}>
                  <td className="px-2 py-1 border">{detail.year}</td>
                  <td className="px-2 py-1 border">
                    {detail.population?.toLocaleString() ?? NO_VALUE}
                  </td>
                  <td className="px-2 py-1 border">
                    {detail.co2?.toLocaleString() ?? NO_VALUE}
                  </td>
                  <td className="px-2 py-1 border">
                    {detail.co2_per_capita?.toLocaleString() ?? NO_VALUE}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
}

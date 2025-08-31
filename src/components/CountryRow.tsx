import React, { Fragment, useCallback, useState } from 'react';
import type { ParsedCountry } from '../types/Country';
import { NO_VALUE } from '../assets/const';
import CountryDetails from './CountryDetails';

export const CountryRow = React.memo(function CountryRow({
  country,
  selectedYear,
  highlighted,
}: {
  country: ParsedCountry;
  selectedYear: number | null;
  highlighted: Set<string>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleRow = useCallback((isoCode: string) => {
    setExpanded((prev) => (prev === isoCode ? null : isoCode));
  }, []);
  const isOpen = expanded === country.isoCode || expanded === country.name;
  const yearData = country.details.find((d) => d.year === selectedYear);
  return (
    <Fragment key={country.isoCode ?? country.name + 'fragment'}>
      <tr
        key={country.isoCode ?? country.name}
        onClick={() => toggleRow(country.isoCode ?? country.name)}
        className={`hover:bg-blue-100 cursor-pointer ${isOpen ? 'border-gray-400 border-t-1' : ''}`}
      >
        <td className="px-2 py-2 text-center align-middle">
          <span
            className={`inline-block transform transition-transform duration-200 ${
              isOpen ? 'rotate-90' : ''
            }`}
          >
            ▶
          </span>
        </td>
        <td className="px-4 py-2">{country.name}</td>
        <td
          className={`px-4 py-2 
                        ${highlighted.has(country.isoCode ?? country.name) ? 'highlight' : ''}
                       `}
        >
          <div className={isOpen ? 'border-2 border-green-500' : ''}>
            {yearData?.population?.toLocaleString() ?? NO_VALUE}
          </div>
        </td>
        <td className="px-4 py-2">{country.isoCode ?? NO_VALUE}</td>
      </tr>
      {isOpen && <CountryDetails country={country} highlight={selectedYear} />}
    </Fragment>
  );
});

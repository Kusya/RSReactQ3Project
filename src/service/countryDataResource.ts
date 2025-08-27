import { createResource } from './createResource';
import { type OwidCo2Data, type OwidYearlyData } from './../types/Country';

function parseCountries(json: object) {
  return Object.entries(json).map(([country, data]) => {
    const countryData = data as OwidCo2Data;
    const { iso_code, data: yearlyData } = countryData;

    const populations = yearlyData
      .map((year: OwidYearlyData) => ({
        year: year.year,
        population: year.population,
      }))
      .sort((a, b) => a.year - b.year)
      .pop();
    return {
      name: country,
      isoCode: iso_code,
      population: populations?.population,
    };
  });
}

export const countryDataResource = createResource(
  (async () => {
    const res = await fetch('../../owid-co2-data.json');
    if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`);
    const json = await res.json();
    return parseCountries(json);
  })()
);

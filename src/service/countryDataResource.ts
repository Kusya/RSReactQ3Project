import { createResource } from './createResource';
import type { OWIDDataMap, ParsedCountry } from '../types/Country';

function parseCountries(json: OWIDDataMap): ParsedCountry[] {
  return Object.entries(json).map(([country, data]) => {
    const latestPopulation = [...data.data]
      .reverse()
      .find((entry) => entry.population !== undefined)?.population;

    return {
      name: country,
      isoCode: data.iso_code,
      details: data.data
        .map((entry) => ({
          year: entry.year,
          population: entry.population,
          co2: entry.co2,
          co2_per_capita: entry.co2_per_capita,
          cumulative_co2: entry.cumulative_co2,
          oil_co2: entry.oil_co2,
          primary_energy_consumption: entry.primary_energy_consumption,
          nitrous_oxide: entry.nitrous_oxide,
          methane: entry.methane,
        }))
        .reverse(),
      latestPopulation,
    };
  });
}

export const countryDataResource = createResource(
  (async () => {
    const res = await fetch('../../owid-co2-data.json');
    if (!res.ok) throw new Error(`Failed to load JSON: ${res.status}`);
    const json: OWIDDataMap = await res.json();
    return parseCountries(json);
  })()
);

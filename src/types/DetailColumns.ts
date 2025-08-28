import { type YearlyRecord } from './Country';
export type DetailColumnKey = keyof YearlyRecord;

export type DetailColumn = {
  key: DetailColumnKey;
  label: string;
};

export const ALL_DETAILS_COLUMNS: DetailColumn[] = [
  { key: 'population', label: 'Population' },
  { key: 'co2', label: 'CO₂' },
  { key: 'co2_per_capita', label: 'CO₂ per capita' },
  { key: 'consumption_co2', label: 'Consumption CO₂' },
  { key: 'oil_co2', label: 'Oil CO₂' },
  { key: 'nitrous_oxide', label: 'Nitrous oxide' },
  { key: 'methane', label: 'Methane' },
  { key: 'primary_energy_consumption', label: 'Primary energy consumption' },
];

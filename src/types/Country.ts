export type ParsedCountry = {
  name: string;
  isoCode?: string;
  population?: number;
};
export type RawCountry = {
  iso_code?: string;
  data: { year: number; population?: number }[];
};

export type OwidCo2Data = {
  iso_code?: string;
  data: OwidYearlyData[];
};

export type OwidYearlyData = {
  year: number;

  co2?: number;
  co2_per_capita?: number;
  co2_per_gdp?: number;

  consumption_co2?: number;
  consumption_co2_per_capita?: number;

  cumulative_co2?: number;
  cumulative_co2_per_capita?: number;

  ghg?: number;
  ghg_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;

  primary_energy_consumption?: number;
  energy_per_capita?: number;
  energy_per_gdp?: number;

  population?: number;
  gdp?: number;

  flaring_co2?: number;
  flaring_co2_per_capita?: number;
  land_use_change_co2?: number;
  land_use_change_co2_per_capita?: number;

  cement_co2?: number;
  cement_co2_per_capita?: number;
  coal_co2?: number;
  coal_co2_per_capita?: number;
  gas_co2?: number;
  gas_co2_per_capita?: number;
  oil_co2?: number;
  oil_co2_per_capita?: number;

  trade_co2?: number;
  trade_co2_share?: number;
};

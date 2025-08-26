export type ParsedCountry = {
  name: string;
  isoCode?: string;
  population?: number;
};
export type RawCountry = {
  iso_code?: string;
  data: { year: number; population?: number }[];
};

export type Country = {
  name: CountrySpecifics;
};

type CountrySpecifics = {
  common: string;
  official: string;
  nativeName: countryNative;
};

type countryNative = {
  official: string;
  common: string;
};

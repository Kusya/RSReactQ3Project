export type PokemonDetails = {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  stats: Array<PokeStat>;
};

export type PokeStat = {
  name: string;
  stat: number;
};

export type foreinStats = {
  base_stat: number;
  effort: number;
  stat: foreinStat;
};
export type foreinStat = {
  name: string;
  url: string;
};
export type PokeItem = {
  name: string;
  url: string;
};
export type PokeCard = {
  name: string;
  imageUrl: string;
  url: string;
};

export type externalPokemonDetails = {
  id: number;
  name: string;
  sprites: externalSprite;
  height: number;
  weight: number;
  stats: Array<foreinStats>;
  abilities: Array<externalAbilities>;
  base_experience: number;
  forms: Array<PokeItem>;
  types: Array<externalAbilities>;
};
export type externalSprite = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};
export type externalAbilities = {
  ability: PokeItem;
  is_hidden: boolean;
  slot: number;
};

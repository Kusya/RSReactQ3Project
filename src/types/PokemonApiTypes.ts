export interface PokemonDetails {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  stats: Array<PokeStat>;
}

export interface PokeStat {
  name: string;
  stat: number;
}

export interface foreinStats {
  base_stat: number;
  effort: number;
  stat: foreinStat;
}
export interface foreinStat {
  name: string;
  url: string;
}

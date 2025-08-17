'use server';

import PokeApiService from './../service/api';

import { foreinStats, PokemonDetails } from '../../types/PokemonApiTypes';

export async function fetchPokemon(name: string) {
  const data = await PokeApiService.fetchItemByName(name);
  const stats = data.stats.map((stat: foreinStats) => ({
    name: stat.stat.name,
    stat: stat.base_stat,
  }));
  const details = {
    name: data.name,
    stats: stats,
    id: data.id,
    imageUrl: data.sprites.front_default,
    height: data.height,
    weight: data.weight,
  } as PokemonDetails;

  return details;
}

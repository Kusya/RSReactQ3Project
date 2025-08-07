import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PageParams } from '../types/PageParams';
import type {
  externalPokemonDetails,
  PokeItem,
} from '../types/PokemonApiTypes';

const pokeUrl = 'https://pokeapi.co/api/v2/';
export type foreignPokeData = {
  count: number;
  results: PokeItem[];
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: pokeUrl }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<externalPokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonById: builder.query<externalPokemonDetails, string>({
      query: (id) => `pokemon/${id}`,
    }),
    getPokemonList: builder.query<foreignPokeData, void>({ // eslint-disable-line
      query: () => `pokemon/?limit=10000&offset=0`,
    }),
    getPokemonsByPage: builder.query<PokeItem[], PageParams>({
      query: ({ limit = 10, pageNumber = 1 }: PageParams) =>
        `pokemon/?limit=${limit}&offset=${(pageNumber - 1) * limit}`,
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
  useGetPokemonListQuery,
  useGetPokemonsByPageQuery,
} = pokemonApi;

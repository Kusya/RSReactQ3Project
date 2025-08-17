import PokemonListPanel from './PokemonListPanel';
import './CardList.css';
import React from 'react';

import PokeApiService from '@service/api';

export default async function PokemonSearchPage() {
  const res = await PokeApiService.fetchData();
  const pokemonList = await res.results;
  return (
    <div className="card-list-layout">
      <div>
        <PokemonListPanel pokemonList={pokemonList} />
      </div>
    </div>
  );
}

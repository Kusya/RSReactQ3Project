import React from 'react';

import PokemonSearchPage from './components/Main';
import PokeApiService from './service/api';

export default async function App() {
  const data = await PokeApiService.fetchData();
  const posts = await data.result;
  return <PokemonSearchPage data={posts} />;
}

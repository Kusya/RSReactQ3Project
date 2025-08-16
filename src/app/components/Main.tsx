import CardList from './CardList';
import './CardList.css';
import React from 'react';

import PokeApiService from '@service/api';

export default async function PokemonSearchPage() {
  const searchData = '';
  const data = await PokeApiService.fetchData();
  const posts = await data.result;
  return (
    <div className="card-list-layout">
      <div>
        <CardList searchString={searchData} data={posts} />
      </div>
    </div>
  );
}

import Search from './Search';
import CardList from './CardList';
import './CardList.css';
import React from 'react';

export default function PokemonSearchPage() {
  const searchData = '';

  return (
    <div className="card-list-layout">
      <div>
        <Search searchStr={searchData} />
        <CardList searchString={searchData} />
      </div>
    </div>
  );
}

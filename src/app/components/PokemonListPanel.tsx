'use client';
import PagedList from './PagedList';
import useLocalStorage from '../../hooks/useLocalStorage';
import { PokeItem } from '../../types/PokemonApiTypes';
import Search from './Search';
import { useState } from 'react';

interface PokemonListPanelProps {
  pokemonList: Array<PokeItem>;
}
export default function PokemonListPanel(props: PokemonListPanelProps) {
  const [searchData, setSearchData] = useLocalStorage('searchInput', '');

  const filteredList = () => {
    return !searchData
      ? props.pokemonList
      : props.pokemonList.filter((pokemon: PokeItem) =>
          pokemon.name.includes(searchData.toLowerCase())
        );
  };

  const [data, setData] = useState(filteredList);

  const onSearch = (searchString: string) => {
    debugger
    setSearchData(searchString);
    const pokemonData = !searchString
      ? props.pokemonList
      : props.pokemonList.filter((pokemon: PokeItem) =>
          pokemon.name.includes(searchString.toLowerCase())
        );
    setData(pokemonData);
  };

  return (
    <>
      <Search searchStr={searchData} sendSearchUp={onSearch} />
      <PagedList filteredPokeList={data} />
    </>
  );
}

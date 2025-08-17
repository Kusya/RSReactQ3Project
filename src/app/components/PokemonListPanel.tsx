'use client';
import CardList from './Cardlist';
import useLocalStorage from '../../hooks/useLocalStorage';
import { PokeItem } from '../../types/PokemonApiTypes';
import Search from './Search';

interface PokemonListPanelProps {
  pokemonList: Array<PokeItem>;
}
export default function PokemonListPanel(props: PokemonListPanelProps) {
  const [searchData, setSearchData] = useLocalStorage('searchInput', '');
  return (
    <>
      <Search searchStr={searchData} sendSearchUp={setSearchData} />
      <CardList searchString={searchData} pokemonList={props.pokemonList} />
    </>
  );
}

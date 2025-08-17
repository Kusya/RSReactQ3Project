'use client';
import PagedList from './PagedList';
import useLocalStorage from '../../hooks/useLocalStorage';
import { PokeItem } from '../../types/PokemonApiTypes';
import Search from './Search';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PokemonDetails from './PokemonDetails';
import { PokemonDetails as detailsType } from '@/types/PokemonApiTypes';
import { fetchPokemon } from '../actions/fetchPokemon';

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
    setSearchData(searchString);
    const pokemonData = !searchString
      ? props.pokemonList
      : props.pokemonList.filter((pokemon: PokeItem) =>
          pokemon.name.includes(searchString.toLowerCase())
        );
    setData(pokemonData);
  };

  const searchParams = useSearchParams();
  const detailsName = searchParams?.get('details');

  const [details, setDetails] = useState<detailsType>();

  useEffect(() => {
    const loadData = async () => {
      if (detailsName) {
        const result = await fetchPokemon(detailsName);
        setDetails(result);
      }
    };
    loadData();
  }, [detailsName]);

  const onDetailsAppear = (data: detailsType) => {
    setDetails(data);
  };

  return (
    <div className="flex">
      <div>
        <Search searchStr={searchData} sendSearchUp={onSearch} />
        <PagedList filteredPokeList={data} sendDetailsUp={onDetailsAppear} />
      </div>
      {details ? (
        <div>
          <PokemonDetails data={details} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

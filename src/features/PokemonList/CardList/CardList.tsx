import { useEffect, useState } from 'react';
import { useGetPokemonListQuery } from './../../../services/PokemonApiService';
import Pagination from '../../../components/Pagination/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import './CardList.css';
import { ITEMS_PER_PAGE } from '../../../app/constants';
import SelectedMenu from '../SelectedItemsMenu';
import PokemonCard from '../Card/PokemonCard';
import type { PokeItem } from '../../../types/Pokemontypes';

interface CardListProps {
  searchString: string;
}

export default function CardList(props: CardListProps) {
  const [filteredData, setFilteredData] = useState<PokeItem[]>([]);
  const [showData, setShowData] = useState<PokeItem[]>([]);

  const [totalPages, settotalPages] = useState(10);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );

  const {
    data: rawData,
    isError,
    error,
    isLoading,
    isUninitialized,
  } = useGetPokemonListQuery();

  const validate = () => {
    if (isNaN(currentPage) || currentPage < 1) {
      return <div>Incorrect page number</div>;
    }

    if (currentPage > totalPages) {
      return (
        <div>
          <h1>404 - Page not found</h1>
          <p>
            Page {currentPage} not exists. Total pages: {totalPages}.
          </p>
          <Link to={`/?page=${totalPages}`}>Go to last page</Link>
        </div>
      );
    }
  };

  const getPageCount = () => {
    if (rawData?.results) {
      const pokemonData = props.searchString
        ? rawData.results.filter((pokemon: PokeItem) =>
            pokemon.name.includes(props.searchString.toLowerCase())
          )
        : rawData.results;

      setFilteredData(pokemonData);

      settotalPages(Math.ceil(pokemonData.length / ITEMS_PER_PAGE));
      setPage(parseInt(searchParams.get('page') || '1', 10));
    }
  };

  const loadData = () => {
    if (!filteredData) return;
    let resultData: Array<PokeItem> = [];
    resultData = filteredData;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    resultData = resultData.slice(startIndex, endIndex);

    setShowData(resultData);
  };

  useEffect(() => {
    getPageCount();
  }, [props.searchString, rawData]);
  useEffect(() => {
    validate();
    setSearchParams({ page: currentPage.toString() });

    loadData();
  }, [currentPage, filteredData]);

  if (isLoading || isUninitialized)
    return (
      <div id="pokemonTable" className="card-list">
        Loading...
      </div>
    );
  if (isError)
    return error instanceof Error ? (
      <div className="card-list">Error: {error.message}</div>
    ) : (
      <div className="card-list">something went wrong</div>
    );

  if (!showData) return <div>No items found</div>;
  return (
    <div>
      <div className="card-list-layout">
        <div className="card-list-sidebar">
          <ul className="card-list">
            {showData.map((item: PokeItem) => (
              <PokemonCard key={item.name} item={item} />
            ))}
          </ul>
        </div>
      </div>
      <SelectedMenu></SelectedMenu>
      <Pagination
        page={currentPage}
        sendPageUp={(page) => {
          setPage(page);
        }}
        totalPages={totalPages}
      />
    </div>
  );
}

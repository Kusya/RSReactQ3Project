import { useEffect, useState } from 'react';
import PokeApiService from '../../../services/PokemonApiService';
import Pagination from '../../../components/Pagination/Pagination';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import './CardList.css';
import { ITEMS_PER_PAGE } from '../../../app/constants';
import SelectedMenu from '../SelectedItemsMenu';
import PokemonCard from '../Card/PokemonCard';
import type { PokeItem } from '../Pokemontypes';

interface CardListProps {
  searchString: string;
}

export default function CardList(props: CardListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<PokeItem[]>([]);

  const [totalPages, settotalPages] = useState(10);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );

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

  useEffect(() => {
    validate();
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    const getPageCount = async () => {
      try {
        const fetchedPokemonData = await PokeApiService.fetchData();
        const pokemonData = !props.searchString
          ? fetchedPokemonData.results
          : fetchedPokemonData.results.filter((pokemon: PokeItem) =>
              pokemon.name.includes(props.searchString.toLowerCase())
            );

        settotalPages(Math.ceil(pokemonData.length / ITEMS_PER_PAGE));
        setPage(1);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? 'Error: ' + err.message : 'Error');
      }
    };
    getPageCount();
  }, [props.searchString]);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        let resultData: Array<PokeItem> = [];
        if (props.searchString) {
          const data = await PokeApiService.fetchData();
          resultData = data.results.filter((item: PokeItem) =>
            item.name.includes(props.searchString.toLowerCase())
          );
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          const endIndex = startIndex + ITEMS_PER_PAGE;
          resultData = resultData.slice(startIndex, endIndex);
        } else {
          const data = await PokeApiService.fetchDataByPage({
            limit: ITEMS_PER_PAGE,
            pageNumber: currentPage,
          });
          resultData = data.results;
        }
        setData(resultData);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? 'Error: ' + err.message
            : 'Error has been occured!'
        );
        setData([]);
      }
    };
    loadData();
  }, [props.searchString, currentPage]);

  if (loading) return <div id="pokemonTable">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data == null || data.length <= 0) return <div>No items found</div>;
  return (
    <div>
      <div className="card-list-layout">
        <div className="card-list-sidebar">
          <h2>Pokemons</h2>
          <ul className="card-list">
            {data.map((item: PokeItem) => (
              <PokemonCard key={item.name} item={item} />
            ))}
          </ul>
        </div>
        <Outlet />
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

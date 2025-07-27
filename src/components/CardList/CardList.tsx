import { useEffect, useState } from 'react';
import PokeApiService from '../../services/PokemonApiService';
import Pagination from '../Pagination/Pagination';
import { Link, useSearchParams } from 'react-router-dom';

interface CardListProps {
  searchString: string;
}

type PokeItem = {
  name: string;
  url: string;
};

export default function CardList(props: CardListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([] as PokeItem[]);
  const itemsPerPage = 10;

  const [totalPages, settotalPages] = useState(10);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10)
  );

  const validate = () => {
    if (isNaN(page) || page < 1) {
      return <div>Incorrect page number</div>;
    }

    if (page > totalPages) {
      return (
        <div>
          <h1>404 - Page not found</h1>
          <p>
            Page {page} not exists. Total pages: {totalPages}.
          </p>
          <Link to={`/?page=${totalPages}`}>Go to last page</Link>
        </div>
      );
    }
  };

  useEffect(() => {
    validate();
    if (page === 1) {
      const { page: _page, ...rest } = Object.fromEntries(searchParams); // eslint-disable-line
      setSearchParams(rest);
    } else {
      setSearchParams({ page: page.toString() });
    }
  }, [page]);

  useEffect(() => {
    setLoading(true);
    const getPageCount = async () => {
      try {
        const data = await PokeApiService.fetchData();
        const resultData = !props.searchString
          ? data.results
          : data.results.filter((item: PokeItem) =>
              item.name.includes(props.searchString.toLowerCase())
            );

        settotalPages(Math.ceil(resultData.length / itemsPerPage));
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
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          resultData = resultData.slice(startIndex, endIndex);
        } else {
          const data = await PokeApiService.fetchDataByPage({
            limit: itemsPerPage,
            pageNumber: page,
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
  }, [props.searchString, page]);

  if (loading) return <div id="pokemonTable">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data == null || data.length <= 0) return <div>No items found</div>;

  return (
    <div>
      <h3>Pokemons</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: PokeItem) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>
                <a href={item.url}>href</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        sendPageUp={(pageNum) => {
          setPage(pageNum);
        }}
        totalPages={totalPages}
      />
    </div>
  );
}

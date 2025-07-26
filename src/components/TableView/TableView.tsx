import { useEffect, useState } from 'react';
import PokeApiService from '../../services/PokemonApiService';
import Pagination from '../Pagination/Pagination';

interface TableProps {
  searchString: string;
}

type PokeItem = {
  name: string;
  url: string;
};

export default function TableView(props: TableProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState([] as PokeItem[]);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(10);

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

import { useEffect, useState } from 'react';
import PokeApiService from '../services/PokemonApiService';

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
  const [data, setData] = useState([]);
  const itemsLimit = 100;
  const page = 1;

  const loadData = async () => {
    try {
      let resultData = [];
      if (props.searchString) {
        const data = await PokeApiService.fetchData();
        resultData = data.results.filter((item: PokeItem) =>
          item.name.includes(props.searchString.toLowerCase())
        );
      } else {
        const data = await PokeApiService.fetchDataByPage({
          limit: itemsLimit,
          pageNumber: page,
        });
        resultData = data.results;
      }
      setData(resultData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setLoading(false);
      setData([]);
    }
  };

  useEffect(() => {
    loadData();
  });

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
    </div>
  );
}

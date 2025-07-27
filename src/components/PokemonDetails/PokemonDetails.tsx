import { Link, useParams } from 'react-router-dom';
import './PokemonDetails.css';
import { useEffect, useState } from 'react';
import PokeApiService from '../../services/PokemonApiService';

interface PokemonDetails {
  id: number;
  name: string;
  imageUrl: string;
  height: number;
  weight: number;
  stats: Array<PokeStats>;
}
interface PokeStats {
  name: string;
  stat: number;
}

interface foreinStats {
  base_stat: number;
  effort: number;
  stat: foreinStat;
}
interface foreinStat {
  name: string;
  url: string;
}
export default function PokemonDetails() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const item = { id: 'test' };
  const [details, setDetails] = useState({} as PokemonDetails);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        if (id) {
          const data = await PokeApiService.fetchItemById(id);
          const stats = data.stats.map((st: foreinStats) => ({
            name: st.stat.name,
            stat: st.base_stat,
          }));
          setDetails({
            name: data.name,
            stats: stats,
            id: data.id,
            imageUrl: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
          } as PokemonDetails);
        } else {
          console.log('id is not defined');
        }
        setLoading(false);
      } catch (err) {
        console.log('Error: ' + err);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="pokemon-details">
      {item ? (
        <>
          <h2>{details.name}</h2>
          <img src={details.imageUrl}></img>

          <p>Stats:</p>
          <ul>
            {details.stats
              ? details.stats.map((it) => (
                  <li key={it.name}>
                    {it.name}: {it.stat}
                  </li>
                ))
              : 'no stats'}
          </ul>

          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>

          <Link to={`/details`}>Close</Link>
        </>
      ) : (
        <div className="pokemon-details-placeholder">Select element</div>
      )}
    </div>
  );
}

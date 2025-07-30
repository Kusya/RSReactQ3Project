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
  stats: Array<PokeStat>;
}

interface PokeStat {
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
  const [details, setDetails] = useState<PokemonDetails>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      try {
        if (id) {
          const data = await PokeApiService.fetchItemById(id);
          const stats = data.stats.map((stat: foreinStats) => ({
            name: stat.stat.name,
            stat: stat.base_stat,
          }));
          const resultDetails: PokemonDetails = {
            name: data.name,
            stats: stats,
            id: data.id,
            imageUrl: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
          };
          setDetails(resultDetails);
        } else {
          console.error('Id is not defined for details to be shown.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error: ' + err);
        setError('Failed to load Pokémon.');
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;
  return (
    <div className="pokemon-details">
      {details ? (
        <>
          <h2>{details.name}</h2>
          <img src={details.imageUrl}></img>

          <p>Stats:</p>
          <ul>
            {details.stats
              ? details.stats.map((stat) => (
                  <li key={stat.name}>
                    {stat.name}: {stat.stat}
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

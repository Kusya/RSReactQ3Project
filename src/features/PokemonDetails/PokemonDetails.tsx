import { Link, useParams } from 'react-router-dom';
import './PokemonDetails.css';
import { useGetPokemonByIdQuery } from './../../services/PokemonApiService';
import type { PokemonDetails } from './../../types/PokemonApiTypes';

export default function PokemonDetails() {
  const { id } = useParams();
  if (!id) return 'no loaded data';
  const { data, isError, error, isLoading } = useGetPokemonByIdQuery(id);// eslint-disable-line

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return error instanceof Error ? (
      <div data-testid="error">Error: {error.message}</div>
    ) : (
      <div data-testid="error">something went wrong</div>
    );
  if (!data) return 'no loaded data';

  return (
    <div className="pokemon-details">
      {data ? (
        <>
          <h2>{data.name}</h2>
          <img src={data.sprites.front_default}></img>

          <p>Stats:</p>
          <ul>
            {data.stats
              ? data.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))
              : 'no stats'}
          </ul>

          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>

          <Link to={`/details`}>Close</Link>
        </>
      ) : (
        <div className="pokemon-details-placeholder">Select element</div>
      )}
    </div>
  );
}

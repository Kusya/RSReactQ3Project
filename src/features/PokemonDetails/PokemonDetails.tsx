import './PokemonDetails.css';
import { useGetPokemonByNameQuery } from './../../services/PokemonApiService';
import type { PokemonDetails } from './../../types/PokemonApiTypes';
import CustomButton from '../../components/CustomButton/CustomButton';
import refresh from './../../assets/refresh-icon.svg';
import refreshWt from './../../assets/refresh-icon-white.svg';

import { useContext } from 'react';
import { ThemeContext } from '../../app/context';

interface PokemonDetailsProps {
  name: string;
}
export default function PokemonDetails(props: PokemonDetailsProps) {
  const { data, isError, error, isLoading, isFetching, refetch } =
    useGetPokemonByNameQuery(props.name);
  const theme = useContext(ThemeContext);

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError)
    return error instanceof Error ? (
      <div data-testid="error">Error: {error.message}</div>
    ) : (
      <div data-testid="error">something went wrong</div>
    );
  if (!data)
    return (
      <div className="pokemon-details">
        No data loaded for pokemon {props.name}. Please try again.
      </div>
    );

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
          <CustomButton handleClick={refetch}>
            {' '}
            <img
              src={theme === 'dark' ? refreshWt : refresh}
              className="logo"
              alt="Refresh pokemon details"
              title="Refresh pokemon details"
            ></img>
          </CustomButton>
        </>
      ) : (
        <div className="pokemon-details-placeholder">Select element</div>
      )}
    </div>
  );
}

import { Link, useSearchParams } from 'react-router-dom';
import { PokemonCheckbox } from '../PokemonCheckbox';
import type { PokeItem } from '../../../types/Pokemontypes';
import { useGetPokemonByNameQuery } from '../../../services/PokemonApiService';
import type {
  PokemonDetails,
  foreinStats,
} from '../../../types/PokemonApiTypes';

interface PokemonCardProps {
  item: PokeItem;
}

export default function PokemonCard(props: PokemonCardProps) {
  const [searchParams] = useSearchParams();
  const { data, isError, error, isLoading, isFetching, isUninitialized } =
    useGetPokemonByNameQuery(props.item.name);

  const search = new URLSearchParams(searchParams);

  if (isLoading || isUninitialized || isFetching)
    return <div className="card-list-item"> Loading...</div>;

  if (isError)
    return error instanceof Error ? (
      <div className="card-list-item">Error: {error.message}</div>
    ) : (
      <div className="card-list-item">something went wrong</div>
    );
  if (!data) return 'no loaded data';

  const stats = data.stats.map((stat: foreinStats) => ({
    name: stat.stat.name,
    stat: stat.base_stat,
  }));
  const mappedPokemon: PokemonDetails = {
    id: data.id,
    name: data.name,
    stats: stats,
    imageUrl: data.sprites.front_default,
    height: data.height,
    weight: data.weight,
  };

  return (
    <li key={data.name} className="card-list-item">
      <PokemonCheckbox pokemon={mappedPokemon}></PokemonCheckbox>

      <Link
        to={{
          pathname: `details/${data.name}`,
          search: search.toString(),
        }}
      >
        <img src={data.sprites.front_default}></img>
        <strong>{props.item.name}</strong>
      </Link>
    </li>
  );
}

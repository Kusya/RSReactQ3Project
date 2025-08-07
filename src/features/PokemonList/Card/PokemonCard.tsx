import { Link, useSearchParams } from 'react-router-dom';
import { PokemonCheckbox } from '../PokemonCheckbox';
import type { PokeItem } from '../Pokemontypes';
import { useGetPokemonByNameQuery } from '../../../services/PokemonApiService';

interface PokemonCardProps {
  item: PokeItem;
}

export default function PokemonCard(props: PokemonCardProps) {
  const [searchParams] = useSearchParams();
  const { data, isError, error, isLoading, isUninitialized } =
    useGetPokemonByNameQuery(props.item.name);

  const search = new URLSearchParams(searchParams);
  if (isLoading || isUninitialized)
    return <div className="card-list-item"> Loading...</div>;

  if (isError)
    return error instanceof Error ? (
      <div className="card-list-item">Error: {error.message}</div>
    ) : (
      <div className="card-list-item">something went wrong</div>
    );
  if (!data) return 'no loaded data';

  return (
    <li key={data.name} className="card-list-item">
      <PokemonCheckbox id={data.id.toString()}></PokemonCheckbox>

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

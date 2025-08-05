import { Link, useSearchParams } from 'react-router-dom';
import { PokemonCheckbox } from '../PokemonCheckbox';
import type { PokeItem } from '../Pokemontypes';

interface PokemonCardProps {
  item: PokeItem;
}

export default function PokemonCard(props: PokemonCardProps) {
  const [searchParams] = useSearchParams();
  const id = props.item.url.split('/').filter(Boolean).pop();
  const search = new URLSearchParams(searchParams);
  if (!id) return;
  return (
    <li key={props.item.name} className="card-list-item">
      <PokemonCheckbox id={id}></PokemonCheckbox>
      <Link
        to={{
          pathname: `details/${id}`,
          search: search.toString(),
        }}
      >
        <strong>{props.item.name}</strong>
      </Link>
    </li>
  );
}

import { Link, useParams } from 'react-router-dom';
import PokemonDetails from './PokemonDetails';

export default function DetailsWrapper() {
  const { name } = useParams();
  if (!name)
    return (
      <div>
        <div>Pokemon name has not been specified</div>
        <Link to={`/details`}>Close</Link>
      </div>
    );

  return (
    <div>
      <PokemonDetails name={name} />
      <Link to={`/details`}>Close</Link>
    </div>
  );
}

'use client';
import './PokemonDetails.css';
import type { PokemonDetails } from '../../types/PokemonApiTypes';
import Image from 'next/image';
import { redirect } from '@/i18n/navigation';

interface PokemonDetailsProps {
  data: PokemonDetails;
}
export default function PokemonDetails(props: PokemonDetailsProps) {
  const onCloseClick = () => {
    redirect({ href: '/', locale: 'en' });
  };

  if (!props.data)
    return (
      <div className="pokemon-details">
        No data loaded for pokemon. Please try again.
      </div>
    );

  return (
    <div className="pokemon-details">
      {props.data ? (
        <>
          <h2>{props.data.name}</h2>
          <Image
            width={300}
            height={300}
            alt="Picture of the pokemon"
            src={props.data.imageUrl}
          ></Image>

          <p>Stats:</p>
          <ul>
            {props.data.stats
              ? props.data.stats.map((stat) => (
                  <li key={stat.name}>
                    {stat.name}: {stat.stat}
                  </li>
                ))
              : 'no stats'}
          </ul>

          <p>Height: {props.data.height}</p>
          <p>Weight: {props.data.weight}</p>
          <button className="text-red-300 p-4" onClick={onCloseClick}>
            X
          </button>
        </>
      ) : (
        <div className="pokemon-details-placeholder">...</div>
      )}
    </div>
  );
}

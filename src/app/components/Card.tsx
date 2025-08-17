'use client';
import { PokemonCheckbox } from './PokemonCheckbox';
import type { PokeItem } from './../../types/Pokemontypes';
import type { PokemonDetails } from './../../types/PokemonApiTypes';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { fetchPokemon } from './../actions/fetchPokemon';

interface PokemonCardProps {
  item: PokeItem;
}

export default function PokemonCard(props: PokemonCardProps) {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState({} as PokemonDetails);
  const search = searchParams?.get('search');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPokemon(props.item.name);
      setDetails(data);
    };
    loadData();
  }, [props.item.name]);

  if (!details) return 'no loaded data';

  return (
    <li key={details.name} className="card-list-item">
      <PokemonCheckbox pokemon={details}></PokemonCheckbox>
      <Link
        href={{
          pathname: `details/${details.name}`,
          search: search?.toString(),
        }}
      >
        {details.imageUrl ? (
          <Image
            width={30}
            height={30}
            alt="Picture of the pokemon"
            src={details.imageUrl}
          ></Image>
        ) : (
          <p>...</p>
        )}
        <strong>{props.item.name}</strong>
      </Link>
    </li>
  );
}

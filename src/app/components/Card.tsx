'use client';
import { PokemonCheckbox } from './PokemonCheckbox';
import type { PokeItem } from './../../types/Pokemontypes';
import type { PokemonDetails } from './../../types/PokemonApiTypes';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchPokemon } from './../actions/fetchPokemon';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface PokemonCardProps {
  item: PokeItem;
  sendDetailsUp: (data: PokemonDetails) => void;
}

export default function PokemonCard(props: PokemonCardProps) {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState({} as PokemonDetails);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPokemon(props.item.name);
      setDetails(data);
    };
    loadData();
  }, [props.item.name]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const router = useRouter();
  const pathname = usePathname();

  const setDetailsInQueryString = () => {
    router.push(pathname + '?' + createQueryString('details', props.item.name));
    props.sendDetailsUp(details);
  };

  if (!details) return 'no loaded data';

  return (
    <li key={details.name} className="card-list-item">
      <PokemonCheckbox pokemon={details}></PokemonCheckbox>
      <button onClick={setDetailsInQueryString}>
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
      </button>
    </li>
  );
}

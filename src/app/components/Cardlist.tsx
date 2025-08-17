'use client';
// import SelectedMenu from './SelectedItemsMenu';
import PokemonCard from './Card';
import type { PokeItem } from './../../types/Pokemontypes';
import React from 'react';

interface CardListProps {
  pagedList: Array<PokeItem>;
}

export default function Cardlist(props: CardListProps) {
  
  if (props.pagedList == null || props.pagedList.length <= 0) return <div>No items found</div>;
  return (
    <>
      <div className="card-list-layout pl-2">
        <div className="card-list-sidebar p-2">
          <ul className="card-list">
            {props.pagedList.map((item: PokeItem) => (
              <PokemonCard key={item.name} item={item} />
            ))}
          </ul>
        </div>
      </div>
      {/* <SelectedMenu></SelectedMenu> */}
    </>
  );
}

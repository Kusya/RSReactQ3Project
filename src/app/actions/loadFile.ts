'use server';

import { PokemonDetails, PokeStat } from '@/types/PokemonApiTypes';

export async function createFile(selected: PokemonDetails[]) {
  const stringArray: string[] = [
    `id,name,stat1,stat2,stat3,stat4,stat5,stat6,image,height,weight\n`,
  ];
  for (const pokemon of selected) {
    let resultString = '';
    if (pokemon) {
      const stats = pokemon.stats.map(
        (stat: PokeStat) => `${stat.name}: ${stat.stat}`
      );
      resultString += `${pokemon.id},${pokemon.name},${stats.toString()},${pokemon.imageUrl},${pokemon.height},${pokemon.weight}\n`;
    } else {
      console.error('Id is not defined for details to be shown.');
    }
    stringArray.push(resultString);
  }

  return { data: stringArray };
}

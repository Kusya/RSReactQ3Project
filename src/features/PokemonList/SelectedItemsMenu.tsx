import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeAll } from './selectedPokemonsSlice';
import type { PokeStat } from '../../types/PokemonApiTypes';
import saveAs from 'file-saver';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function SelectedMenu() {
  const [error, setError] = useState<string | null>(null);
  const selected = useAppSelector(
    (state) => state.selectedPokemons.selectedItems
  );
  const dispatch = useAppDispatch();

  const loadData = async () => {
    try {
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
      const file = new File(stringArray, `${selected.length}_items.csv`, {
        type: 'text/csv;charset=utf-8',
      });
      saveAs(file);
    } catch (err) {
      console.error('Error: ' + err);
      setError('Failed to load data for downloading.');
    }
  };

  if (error) return <div data-testid="error">Error: {error}</div>;
  return (
    <>
      {selected.length > 0 ? (
        <div>
          Items selected: {selected.length}
          <CustomButton
            handleClick={() => {
              dispatch(removeAll());
            }}
          >
            Unselect All
          </CustomButton>
          <CustomButton
            handleClick={() => {
              loadData();
            }}
          >
            Download
          </CustomButton>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

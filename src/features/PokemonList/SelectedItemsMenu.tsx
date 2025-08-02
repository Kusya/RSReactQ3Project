import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeAll } from './selectedPokemonsSlice';
import PokeApiService from '../../services/PokemonApiService';
import type { foreinStats } from '../../types/PokemonApiTypes';
import saveAs from 'file-saver';

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
      for (const id of selected) {
        let resultString = '';
        if (id) {
          const data = await PokeApiService.fetchItemById(id);
          const stats = data.stats.map(
            (stat: foreinStats) => `${stat.stat.name}: ${stat.base_stat}`
          );
          resultString += `${data.id},${data.name},${stats.toString()},${data.sprites.front_default},${data.height},${data.weight}\n`;
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
    <div>
      {selected.length > 0 ? (
        <div>
          Items selected: {selected.length}
          <button
            onClick={() => {
              dispatch(removeAll());
            }}
          >
            Unselect All
          </button>
          <button
            onClick={() => {
              loadData();
            }}
          >
            Download
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

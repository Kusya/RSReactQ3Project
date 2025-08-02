import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeAll } from './selectedPokemonsSlice';
import PokeApiService from '../../services/PokemonApiService';
import type { foreinStats, PokemonDetails } from '../../types/PokemonApiTypes';

export default function SelectedMenu() {
  const [error, setError] = useState<string | null>(null);
  const selected = useAppSelector(
    (state) => state.selectedPokemons.selectedItems
  );
  const dispatch = useAppDispatch();

  const loadData = async () => {
    try {
      const result = selected.forEach(async (id) => {
        let resultString = '';
        if (id) {
          const data = await PokeApiService.fetchItemById(id);
          const stats = data.stats.map((stat: foreinStats) => (
             `${stat.stat.name}: ${stat.base_stat}`
          ));
          resultString += `${data.id}; ${data.name}; ${stats.toString()}; ${data.sprites.front_default}; ${data.height}; ${data.weight};`;
        } else {
          console.error('Id is not defined for details to be shown.');
        }
        return console.log(resultString);
      });
    } catch (err) {
      console.error('Error: ' + err);
      setError('Failed to load data for downloading.');
      //setLoading(false);
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

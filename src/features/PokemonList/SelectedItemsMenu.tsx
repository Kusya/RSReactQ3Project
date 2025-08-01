import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeAll } from './selectedPokemonsSlice';

export default function SelectedMenu() {
  const [error] = useState<string | null>(null);
  const selected = useAppSelector(
    (state) => state.selectedPokemons.selectedItems
  );
  const dispatch = useAppDispatch();

  const loadData = () => {
    const downloadedData = selected.toString();
    console.log(downloadedData);
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

import { addItem, removeItem } from './selectedPokemonsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { PokemonDetails } from '../../types/PokemonApiTypes';

interface CheckboxProps {
  pokemon: PokemonDetails;
}

export function PokemonCheckbox(props: CheckboxProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(
    (state) => state.selectedPokemons.selectedItems
  );
  const specItem = selected.find((item) => item.id === props.pokemon.id);
  const isChecked = specItem !== undefined;
  const toggleItem = () => {
    if (isChecked) {
      dispatch(removeItem(specItem));
    } else {
      dispatch(addItem(props.pokemon));
    }
  };

  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={toggleItem} />
    </div>
  );
}

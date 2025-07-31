import { addItem, removeItem } from './selectedPokemonsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface CheckboxProps {
  id: string;
}

export function PokemonCheckbox(props: CheckboxProps) {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(
    (state) => state.selectedPokemons.selectedItems
  );
  const isChecked = selected.indexOf(props.id) !== -1;
  const toggleItem = () => {
    if (isChecked) {
      dispatch(removeItem(props.id));
    } else {
      dispatch(addItem(props.id));
    }
  };

  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={toggleItem} />
    </div>
  );
}

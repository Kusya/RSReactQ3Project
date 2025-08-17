import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import type { PokemonDetails } from '../../../../types/PokemonApiTypes';

export interface SelectedPokemonsState {
  selectedItems: PokemonDetails[];
}
const initialState: SelectedPokemonsState = {
  selectedItems: [],
};

export const selectedPokemonsSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<PokemonDetails>) {
      const itemId = action.payload.id;
      const index = state.selectedItems.find((item) => item.id === itemId);
      if (index === undefined) {
        state.selectedItems.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<PokemonDetails>) {
      const itemId = action.payload.id;
      const pokemon = state.selectedItems.find((item) => item.id === itemId);
      if (pokemon !== undefined) {
        state.selectedItems = state.selectedItems.filter(
          (obj) => obj.id !== pokemon.id
        );
      }
    },
    removeAll(state) {
      state.selectedItems.length = 0;
    },
  },
});

export const { addItem, removeItem, removeAll } = selectedPokemonsSlice.actions;

export const selectCount = (state: RootState) => state.selectedPokemons;

export default selectedPokemonsSlice.reducer;

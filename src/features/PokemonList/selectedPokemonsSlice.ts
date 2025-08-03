import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface SelectedPokemonsState {
  selectedItems: string[];
}
const initialState: SelectedPokemonsState = {
  selectedItems: [],
};

export const selectedPokemonsSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const index = state.selectedItems.indexOf(itemId);
      if (index === -1) {
        state.selectedItems.push(itemId);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const index = state.selectedItems.indexOf(itemId);
      if (index !== -1) {
        state.selectedItems.splice(index, 1);
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

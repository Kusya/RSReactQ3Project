import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer from '../features/PokemonList/selectedPokemonsSlice';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

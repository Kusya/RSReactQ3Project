import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer from '../features/PokemonList/selectedPokemonsSlice';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonReducer,
  },
});

const rootReducer = combineReducers({
  selectedPokemons: selectedPokemonReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

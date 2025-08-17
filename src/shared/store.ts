import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer from '../features/PokemonList/selectedPokemonsSlice';

import { pokemonApi } from '../services/PokemonApiService';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

const rootReducer = combineReducers({
  selectedPokemons: selectedPokemonReducer,

  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

// import { configureStore } from '@reduxjs/toolkit';

// export const makeStore = () => {
//   return configureStore({
//     reducer: {},
//   });
// };

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer from './features/selected/selectedSlice';

//import { pokemonApi } from '../services/PokemonApiService';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonReducer,
    //[pokemonApi.reducerPath]: pokemonApi.reducer,
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

setupListeners(store.dispatch);

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { User } from '../types/User';

export interface UsersState {
  users: User[];
}
const initialState: UsersState = {
  users: [],
};

export const authorizationDataSlice = createSlice({
  name: 'authorizationData',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<User>) {
      const itemId = action.payload.id;
      const index = state.users.find((item) => item.id === itemId);
      if (index === undefined) {
        state.users.push(action.payload);
      }
    },
    removeItem(state, action: PayloadAction<User>) {
      const itemId = action.payload.id;
      const pokemon = state.users.find((item) => item.id === itemId);
      if (pokemon !== undefined) {
        state.users = state.users.filter((obj) => obj.id !== pokemon.id);
      }
    },
    removeAll(state) {
      state.users.length = 0;
    },
  },
});

export const { addItem, removeItem } = authorizationDataSlice.actions;

export const selectCount = (state: RootState) => state.authorizationData;

export default authorizationDataSlice.reducer;

export const selectUsers = (state: RootState) => state.authorizationData.users;

import {IUser} from '../../models/IUser';
import {createSlice} from '@reduxjs/toolkit';

interface UsersStateType {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UsersStateType = {
  users: [],
  isLoading: false,
  error: ''
}

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {

  }
});

export const usersSliceReducer = usersSlice.reducer;
export const usersSliceActions = usersSlice.actions;
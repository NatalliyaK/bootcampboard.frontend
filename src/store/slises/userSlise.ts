import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../../models/IUser';

export type UserStateType = {
  userList: IUser[];
  isLogined: boolean;
  error: string;
};

const initialState: UserStateType = {
  userList: [],
  isLogined: false,
  error:''
};


export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setIsLogined(
      state,

    ) {
      state.isLogined = true;
      console.log(state.isLogined);
    },
    setInitial(state) {
      state = initialState;
    },
  },
});

export const userSliceReducer = userSlice.reducer;
export const userSliceActions = userSlice.actions;
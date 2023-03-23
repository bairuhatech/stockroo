import {createSlice} from '@reduxjs/toolkit';
const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    user: {},
    guest: false,
    auth: false,
  },
  reducers: {
    login: (state: any, action: any) => {
      (state.user = action.payload), (state.auth = true), (state.guest = false);
    },
    logout: (state: any, action: any) => {
      (state.user = {}), (state.auth = false);
    },
    update: (state: any, action: any) => {
      state.user = {name: action.payload};
    },
    guest: (state: any, action: any) => {
      state.guest = true;
    },
  },
});

export default AuthSlice;
export const {login, logout, update, guest} = AuthSlice.actions;

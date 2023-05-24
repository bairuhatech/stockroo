import {createSlice} from '@reduxjs/toolkit';
const SettingSlice = createSlice({
  name: 'Settings',
  initialState: {
    continues_scan: false,
  },
  reducers: {
    continue_scan: (state: any, action: any) => {
      state.continues_scan = action.payload;
    },
  },
});

export default SettingSlice;
export const {continue_scan} = SettingSlice.actions;

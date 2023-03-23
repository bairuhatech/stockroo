import {createSlice} from '@reduxjs/toolkit';
const ScanSlice = createSlice({
  name: 'Scan',
  initialState: {
    items: [],
  },
  reducers: {
    saveItem: (state: any, action: any) => {
      state.items = action.payload;
    },
    clear: (state: any) => {
      state.items = [];
    },
  },
});

export default ScanSlice;
export const {saveItem, clear} = ScanSlice.actions;

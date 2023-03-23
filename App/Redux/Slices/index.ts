import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import ScanSlice from './ScanSlice';

const Slices = combineReducers({
  Auth: AuthSlice.reducer,
  Scan: ScanSlice.reducer,
});
export default Slices;

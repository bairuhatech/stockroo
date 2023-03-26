import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import ScanSlice from './ScanSlice';
import StockTakeSlice from './StockTakeSlice';

const Slices = combineReducers({
  Auth: AuthSlice.reducer,
  Scan: ScanSlice.reducer,
  StockTake: StockTakeSlice.reducer,
});
export default Slices;

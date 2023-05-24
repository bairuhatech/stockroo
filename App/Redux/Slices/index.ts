import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import SettingSlice from './SettingSlice';
import ScanSlice from './ScanSlice';
import StockTakeSlice from './StockTakeSlice';
import StockCountSlice from './StockCountSlice';

const Slices = combineReducers({
  Auth: AuthSlice.reducer,
  Settings: SettingSlice.reducer,
  Scan: ScanSlice.reducer,
  StockTake: StockTakeSlice.reducer,
  StockCount: StockCountSlice.reducer,
});
export default Slices;

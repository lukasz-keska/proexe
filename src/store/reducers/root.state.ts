import { combineReducers } from 'redux';
import appReducer from './app.reducer';

const RootReducer = combineReducers({
  appList: appReducer
});

export default RootReducer;

export type RootState = ReturnType<typeof RootReducer>;

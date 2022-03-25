import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import RootState from '../reducers/root.state';

export type AppStateType = ReturnType<typeof RootState>;
export type DispatchFunction = ThunkDispatch<AppStateType, void, AnyAction>;

export interface UserDataInterface {
  email: string;
  id?: number;
  name: string;
  username: string;
}
export interface AppStateInterface {
  loaded: boolean;
  data: Array<UserDataInterface & { key: number; city: string }>;
  lastId: number;
}

import axios from 'axios';
import { AnyAction } from 'redux';
import {
  addUserData,
  deleteUserFromResults,
  editUserData,
  setLocalDataFromApi
} from '../actions/app.actions';
import { AppStateInterface, DispatchFunction, UserDataInterface } from '../models/app.model';

const initialState: AppStateInterface = {
  loaded: false,
  data: [],
  lastId: 0
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const appReducer = (state: AppStateInterface = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case setLocalDataFromApi.type:
      const data = payload.map(
        ({
          email,
          id,
          name,
          username,
          address
        }: UserDataInterface & { address: { city: string } }) => ({
          email,
          id,
          key: id,
          name,
          username,
          city: address.city
        })
      );
      return { ...state, loaded: true, data, lastId: data.length ? data[data.length - 1].id : 0 };
    case addUserData.type:
      const newId = state.lastId + 1;
      const newUser = { ...payload, id: newId, key: newId, city: '' };
      const afterAdd = [...state.data];
      afterAdd.push(newUser);
      return { ...state, data: afterAdd, lastId: newId };
    case editUserData.type:
      const afterEdit = state.data.map((el) => {
        if (el.id === payload?.id) {
          const { name, username, email } = payload;
          const updated = { ...el, name, username, email };
          return updated;
        }
        return el;
      });
      return { ...state, data: afterEdit };
    case deleteUserFromResults.type:
      const afterRemoval = state.data.filter((el) => el.id !== payload);
      return {
        ...state,
        data: afterRemoval,
        lastId: afterRemoval.length ? afterRemoval[afterRemoval.length - 1].id : 0
      };
    default:
      return state;
  }
};

export const fetchApiData = (dispatch: DispatchFunction) => {
  const cancelTokenSource = axios.CancelToken.source();
  axios
    .get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', {
      cancelToken: cancelTokenSource.token
    })
    .then(({ data }) => {
      dispatch(setLocalDataFromApi(data));
    })
    .catch((err) => console.error(err));
  return cancelTokenSource;
};

export default appReducer;

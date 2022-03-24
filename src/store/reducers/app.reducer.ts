import axios from 'axios';
import { AnyAction } from 'redux';
import { setLocalDataFromApi } from '../actions/app.actions';
import { AppStateInterface, DispatchFunction } from '../models/app.model';

const initialState: AppStateInterface = {
  loaded: false,
  data: []
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const appReducer = (state: AppStateInterface = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case setLocalDataFromApi.type:
      return { ...state, loaded: true, data: payload };
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

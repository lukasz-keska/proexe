import { AnyAction } from 'redux';

interface AppStateInterface {
  loading: boolean;
}

const initialState: AppStateInterface = {
  loading: true
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const appReducer = (state: AppStateInterface = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default appReducer;

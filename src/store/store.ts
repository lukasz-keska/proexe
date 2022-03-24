import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootState from './reducers/root.state';

const middleware = [thunk];

const store = createStore(RootState, applyMiddleware(...middleware));

export default store;

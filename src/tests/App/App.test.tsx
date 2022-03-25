import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import App from '../../components/App';
import RootReducer from '../../store/reducers/root.state';

const TestProviders = ({ children, store }) => {
  return <Provider store={store}>{children}</Provider>;
};

TestProviders.propTypes = {
  children: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const createState = (initialState) => (actions) => {
  return actions.reduce(RootReducer, initialState);
};

test('renders home page title', () => {
  const state = createState({
    appList: {
      loaded: true,
      data: [],
      lastId: 0
    }
  });
  const store = mockStore(state);

  const rendered = render(
    <TestProviders store={store}>
      <App />
    </TestProviders>
  );

  const mainTitle = rendered.getByTestId('usersTable');
  expect(mainTitle).toBeInTheDocument();
});

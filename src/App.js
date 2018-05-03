import React from 'react';
import { Provider,connect } from 'react-redux';
import configureStore from './store/configure-store';

import Routes from './Routes';

// 创建store
const store = configureStore({});

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;

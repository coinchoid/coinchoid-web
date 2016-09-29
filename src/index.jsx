import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {PlanningAppContainer} from './components/coinchoid-app.jsx';

const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreDevTools(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    isAuthenticated: false
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PlanningAppContainer />
  </Provider>,
  document.getElementById('app')
);

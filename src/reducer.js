import {Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function authenticateUser(state) {
  return state.update('isAuthenticated', () => true);
}

export default function(state = Map(), action) {
  console.log(action)
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SIGN_IN_SUCCESS':
      return authenticateUser(state);
  }
  return state;
}

import { createStore } from 'redux';
import { sessionStore } from '../../storage/sessionStorage';

function storetoken(state = '', action) {
  if (!!action.value) {
    sessionStore(action.value);
  }
  switch (action.type) {
    case 'ASSIGNTOKEN':
      return action.value;
    case 'REMOVETOKEN':
      return '';
    default:
      return state;
  }
}

let tokenstore = createStore(storetoken);

export default tokenstore;

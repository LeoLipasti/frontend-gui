import { createStore } from 'redux';

function storetoken(state = '', action) {
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

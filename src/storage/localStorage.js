import tokenstore from '../redux/store/tokenstore';

// localStorage instead of session if needed

export function localStore(token) {
  localStorage.setItem('session', token)
}

export function localRestore() {
  const token = localStorage.getItem('session');
  if (!!token) {
    tokenstore.dispatch({
      type: "ASSIGNTOKEN",
      value: token
    });
  }
}

export function localReset() {
  localStorage.removeItem('session')
  tokenstore.dispatch({
    type: "ASSIGNTOKEN",
    value: undefined
  });
}
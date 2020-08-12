import tokenstore from '../redux/store/tokenstore';

export function sessionStore(token) {
  sessionStorage.setItem('session',token)
}

export function sessionRestore() {
  const token = sessionStorage.getItem('session');
  if (!!token) {
    tokenstore.dispatch({
      type: "ASSIGNTOKEN",
      value: token
    });
  }
}

export function sessionReset() {
  sessionStorage.removeItem('session')
  tokenstore.dispatch({
    type: "ASSIGNTOKEN",
    value: undefined
  });
}
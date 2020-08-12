export function modelStore(model, reduxid) {
  sessionStorage.setItem('model: ' + reduxid, JSON.stringify(model))
}

export function modelGetState(reduxid) {

  let returnModel;

  try {

    const model = sessionStorage.getItem('model: ' + reduxid);
    
    returnModel = JSON.parse(model);

  } catch {

    returnModel = undefined;

  }

  return returnModel;

}

export function modelReset(reduxid) {
  sessionStorage.removeItem('model: ' + reduxid)
}
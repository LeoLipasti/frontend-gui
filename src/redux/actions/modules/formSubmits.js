import store from '../../store/store';

export async function formSubmits(reduxID,route) {
  console.log("sample submit action");
  console.log("id: " + reduxID);
  const data = store.getState()["moduledata_"+reduxID];
  // use reduxID to get the correct states from redux
  console.log("data: " + data);
  // implement fetch here to make the call
  // use component defined route for route
  return {
    type: 'FORM_SUBMITS',
    null: null
  };
}
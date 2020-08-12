import jsonFetch from '../../../fetch/jsonFetch';

export async function req_formSubmits(reduxID,route) {
  // implement fetch here to make the call
  jsonFetch( '/'+ route, { method: 'PATCH' }, true, reduxID, 0, [] );
  // use component defined route for route
  return {
    type: 'FORM_SUBMITS',
    reduxID: reduxID,
    route: route
  };
}
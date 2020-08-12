import jsonFetch from '../fetch/jsonFetch';

import store from '../redux/store/store';
import { modelStates } from '../redux/actions/static/modelStates'

import { modelGetState, modelStore } from '../storage/modelStorage';

/**
 * 
 * @param {String} model 
 * @param {Array} include 
 * @param {Array} exclude 
 * @param {String} reduxid 
 */
export function staticModels(model, includeArray, excludeArray, reduxid) {

  // Only request model if not done yet so we don't make unnecessary traffic to proxy server.
  // using sessionStorage so works even on refresh
  const sessionState = modelGetState(reduxid);

  if (!!sessionState) {

    // Redux dispatch

    store.dispatch(modelStates(sessionState,reduxid));

  } else {
    
    // jsonFetch - server will recognize this path

    jsonFetch( '/models/' + model, { method: 'GET' }, false )
    .then((response) => { 
      
      let dispatchResponse = response;

      // includeArray: developer given includes
      if (!!includeArray && Array.isArray(includeArray)) {
        // forms
        if (response.hasOwnProperty('fields')) {
          dispatchResponse['fields'] = response['fields'].filter(field => includeArray.includes(field.db));
        }
        // tables
        if (response.hasOwnProperty('columns')) {
          dispatchResponse['columns'] = response['columns'].filter(column => includeArray.includes(column.db));
        }
        // lists
        if (response.hasOwnProperty('items')) {
          dispatchResponse['items'] = response['items'].filter(item => includeArray.includes(item.db));
        }
      }
      // excludeArray: developer given excludes
      if (!!excludeArray && Array.isArray(excludeArray)) {
        // forms
        if (response.hasOwnProperty('fields')) {
          dispatchResponse['fields'] = response['fields'].filter(field => !excludeArray.includes(field.db));
        }
        // tables
        if (response.hasOwnProperty('columns')) {
          dispatchResponse['columns'] = response['columns'].filter(column => !excludeArray.includes(column.db));
        }
        // lists
        if (response.hasOwnProperty('items')) {
          dispatchResponse['items'] = response['items'].filter(item => !excludeArray.includes(item.db));
        }
      }

      // Store to session storage to reduce proxy traffic

      modelStore(dispatchResponse, reduxid);

      // Redux dispatch

      store.dispatch(modelStates(dispatchResponse,reduxid));

    })
    .catch(err => console.log(err));
  }
}
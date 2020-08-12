import DefaultOptions from './defaults/options';
import Filters from './filters';
import fetch from 'isomorphic-unfetch';
import nconf from '../config';
import store from '../redux/store/store';
import tokenstore from '../redux/store/tokenstore';
import { res_responseStates } from '../redux/actions/responses/responseStates'

/**
 * Fetch with valid parameters
 * 
 * @param {String} devPath
 * @param {Object} devOptions
 * @param {Boolean} devToken
 * @param {String} reduxID
 * @param {Number} userOffset
 * @param {String[]} userFilters
 * @param {Object} customdata
 * 
 * sample call for this fetch :
 * jsonFetch( '/users/:id', { method: 'PATCH' }, token{Boolean}, reduxID=json-type{string}, userOffset{Number}, filters{Array} );
 */
export default async function jsonFetch(
    devPath,
    devOptions,
    devToken,
    reduxID,
    userOffset,
    userFilters,
    customdata
  ) {
  const options = new DefaultOptions();
  const filters = new Filters();
  try {
    let path = devPath;
    if (devPath.substring(0,1) !== '/') {
      path = '/' + devPath;
    }

    if (!!userOffset || !!userFilters) {
      filters.applyFilters();
      path = path + filters.query;
    }

    await options.override(
      devToken,
      devOptions.headers,
      devOptions.method,
      devOptions.mode,
      devOptions.cors,
      reduxID
    )

    if (options.method !== 'GET' && options.method !== 'HEAD' && !!reduxID){
      options.body.data = await store.getState().req_requestStates[reduxID];
      options.body = JSON.stringify(options.body);
    } else if (!!customdata) {
      options.body.data = customdata;
      options.body = JSON.stringify(options.body);
    } else {
      options.body = undefined;
    }

    return fetch(nconf.API_ENDPOINT + path, options)
    .then(response => response.json())
    .then((response) => {
      if (!!response.errors) {
        console.log('Error: ', response.errors);
      }
      // REDUX
      // TYPE = TOKEN
      if (!!response.data && response.data.type === 'token') {
        tokenstore.dispatch({
          type: "ASSIGNTOKEN",
          value: response.data.attributes.token
        });
      // TYPE = OTHER
      } else if (!!response.data && !!response.data.type){
        store.dispatch(res_responseStates({ data: response.data.attributes, type: response.data.type }));
      }
      return response;
    });
  } catch(err) {
    console.log(err);
  }
}
import tokenstore from './redux/tokenstore';
import methods from './methods';
import headers from './headers';
import fetch from 'isomorphic-unfetch';
import nconf from '../config';
import { socket } from "./socket";

/**
 * json api fetcher options
 *
 * @param {String} endpoint
 * @param {String} method
 * @param {Object} body
 * @param {String} token
 * 
 * sample call for this enforced fetch :
 * fetch( '/users/:id', 'patch', {}, 'token', offset: 'num', filters: [] );
 */
export default function jsonFetch(
    endpoint,
    method,
    body,
    token,
    offset,
    filters
  ) {
  const options = {};
  try {
    // filters
    const filterQuery = !!offset ? '?page[size]=25&page[offset]=' + offset : '';
    const filtersJoin = !!offset ? '&' : '?';
    const filtersExtra = !!filters ? filtersJoin + filters.join('&') : '';
    //
    // endpoint
    // enforcing slash if not given correctly
    //
    let slash_endpoint = endpoint;
    if (endpoint.substring(0,1) !== '/') {
      slash_endpoint = '/' + endpoint + filterQuery + filtersExtra;
    }
    //
    // method
    // enforcing parameter to lowercase
    //
    options['method'] = methods[method.toLowerCase()];
    //
    // token (optional)
    // enforcing parameter to lowercase
    //
    if (!token || token.toLowerCase() !== 'token') {
      options['headers'][headers.content] = headers.json;
    } else {
      options['headers'][headers.auth] = tokenstore.getState();
      options['headers'][headers.content] = headers.json;
    }
    //
    // mode
    //
    options['mode'] = 'cors';
    //
    // body (optional)
    // enforcing as data if not given correctly
    //
    if (!!body) {
      if (!body['data']) {
        options['body'] = { 'data': body };
      } else {
        options['body'] = body;
      }
    }
    //
    // return
    //
    return fetch(nconf.API_ENDPOINT + slash_endpoint, options)
    .then(response => response.json())
    .then((response) => {
      if (response.errors) {
        console.log('Error: ', response.errors);
      }
      else {
        // emit socket.io event for other users
        socket.emit("dataUpdate", response.data.type);
      }
      return response;
    });
  } catch(err) {
    console.log(err);
  }
}
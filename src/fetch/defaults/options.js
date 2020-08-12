import tokenstore from '../../redux/store/tokenstore';
import methods from './methods';

class DefaultOptions {
  constructor() {
    this.body = {};
    this.body.jsonapi = 
    {
      version: "1.0",
      meta:
      {
        author: "Leo Lipasti",
        description: "Frontend-GUI"
      }
    }
    this.mode = 'cors';
    this.method = 'GET';
    this.headers = {};
  }
  /**
   * 
   * @param {Boolean} token
   * @param {Object} headers
   * @param {String} method
   * @param {String} mode
   * @param {String} cors
   */
  async override(token, headers, method, mode, cors) {
    if (!!token) {
      this.headers['Authorization'] = tokenstore.getState();
    }
    if (!!headers) {
      this.headers = Object.assign(this.headers, headers);
    }
    if (!!method) {
      this.method = methods[method.toUpperCase()];
    }
    if (!!mode) {
      this.mode = mode;
    }
    if (!!cors) {
      this.cors = cors;
    }
    // content type always vnd.api+json
    this.headers['Content-Type'] = 'application/vnd.api+json; charset=utf-8';
  }
}

export default DefaultOptions;
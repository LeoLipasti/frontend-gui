import React, { Component } from 'react';

import lang from '../lang/index';

/**
 * @param {String} classnames
 * @param {Object | Null} inlinestyle
 * @param {String} language
 * @param {Boolean} closed
 * 
 */
export default function NavPresenter({
  classnames,
  inlinestyle,
  language,
  closed
}) {
  return (!closed && (
    <nav className={classnames ? 'navbar navbar-expand-lg navbar-dark bg-primary'+classnames : 'navbar navbar-expand-lg navbar-dark bg-primary'} style={inlinestyle}>
      <a className="navbar-brand" href="#">
        <img src='./images/logo192.png' height='10rem' width='auto'/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">{lang.empty_sample[language]} <span className="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>
  ))
}
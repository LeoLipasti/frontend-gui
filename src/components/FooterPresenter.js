import React, { Component } from 'react';

import lang from '../lang/index';

/**
 * @param {String} info
 * @param {String} language
 */
export default function FooterPresenter({
  info,
  language
}) {
  return (
    <footer className="sticky-footer bg-white">
    <div className="container my-auto">
      <div className="copyright text-center my-auto">
        <span>{lang[info][language]}</span>
      </div>
    </div>
    </footer>
  )
}
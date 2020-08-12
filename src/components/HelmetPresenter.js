import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import lang from '../lang/index'

/**
 * target is target route
 * @param {String} reduxlang
 * @param {String} target
 * @param {Boolean} bg
 * 
 */
export default function HelmetPresenter({
  reduxlang,
  target,
  bg
}) {
  return (
  <Helmet>
    <html lang={lang.lang[reduxlang]}/>
      <title>{lang.titles[reduxlang][target]}</title>
    <meta name="description" content={lang.pages[reduxlang][target]} />
    { bg ? <style>{'body { background-image: url("./images/above-atmosphere-clouds-flight-37728.jpg");}'}</style> : <style>{''}</style> }
  </Helmet>
  )
}
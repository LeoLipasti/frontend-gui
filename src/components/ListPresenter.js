import React, { Component } from 'react';
import List from './presenters/List';

/**
 * @param {String} classnames
 * @param {Object | Null} inlinestyle
 * @param {Object} model
 * @param {Array} attributes
 * @param {String} language
 * 
 */
export default function ListPresenter({
  classnames,
  inlinestyle,
  model,
  attributes,
  reduxID,
  language
}) {
  return (
    <div className={classnames ? 'overflow-auto'+classnames : 'overflow-auto'} style={inlinestyle}>
    <List
        contentArray={model}
        attributes={attributes}
        reduxID={reduxID}
        lang={language}
      />
    </div>
  )
}
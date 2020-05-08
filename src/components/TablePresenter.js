import React, { Component } from 'react';
import Table from './presenters/Table';

/**
 * @param {String} classnames
 * @param {Object | Null} inlinestyle
 * @param {Object} model
 * @param {Array} attributes
 * @param {String} language
 * 
 */
export default function TablePresenter({
  classnames,
  inlinestyle,
  model,
  attributes,
  reduxID,
  language
}) {
  return (
    <div className={classnames ? 'overflow-auto'+classnames : 'overflow-auto'} style={inlinestyle}>
    <Table
        contentArray={model}
        attributes={attributes}
        reduxID={reduxID}
        lang={language}
      />
    </div>
  )
}
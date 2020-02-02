import React, { Component } from 'react';
import Table from './modules/Table';

/**
 * @param {Object} model
 * @param {Array} attributes
 * @param {String} componentStyle
 * @param {String} language
 * 
 */
export default function tableModule({
  model,
  attributes,
  componentStyle,
  language
}) {
  return (
    <Table
      contentArray={model}
      attributes={attributes}
      componentStyle={componentStyle}
      lang={language}
    />
  )
}
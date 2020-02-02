import React, { Component } from 'react';
import List from './modules/List';

/**
 * @param {Object} model
 * @param {Array} attributes
 * @param {String} componentStyle
 * @param {String} language
 * 
 */
export default function listModule({
  model,
  attributes,
  componentStyle,
  language
}) {
  return (
    <List
      contentArray={model}
      attributes={attributes}
      componentStyle={componentStyle}
      lang={language}
    />
  )
}
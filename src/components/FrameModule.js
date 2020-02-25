import React, { Component } from 'react';
import Frame from './modules/Frame';
import { formSubmits } from '../redux/actions/modules/formSubmits';
import { moduleStates } from '../redux/actions/modules/moduleStates';
import store from '../redux/store/store';

/**
 * @param {String} classnames
 * @param {Object | Null} inlinestyle
 * @param {Object} model
 * @param {Array} attributes
 * @param {String} reduxID
 * @param {String} route
 * @param {String} language
 * @param {Function} clickHandlerOther
 * 
 */
export default function FrameModule({
  classnames,
  inlinestyle,
  model,
  attributes,
  reduxID,
  route,
  language,
  clickHandlerOther
}) {
  return (
    <div className={classnames ? 'overflow-auto'+classnames : 'overflow-auto'} style={inlinestyle}>
      <Frame
        clickHandlerClose={() => {
          store.dispatch(moduleStates(reduxID, {module_closed: true}))
        }}
        clickHandlerSubmit={e => {
          store.dispatch(formSubmits(reduxID,route))
        }}
        clickHandlerOther={clickHandlerOther}
        inputHandlerFocus={e => {
          // focus if it is needed
        }}
        inputHandlerChange = {e => {
          store.dispatch(moduleStates(reduxID,e))
        }}
        contentArray={model}
        attributes={attributes}
        reduxID={reduxID}
        lang={language}
      />
    </div>
  )
}
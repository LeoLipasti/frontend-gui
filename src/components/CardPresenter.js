import React, { Component } from 'react';
import Card from './presenters/Card';
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
 * @param {Boolean} closed
 * @param {Function} clickHandlerOther
 * 
 */
export default function CardPresenter({
  classnames,
  inlinestyle,
  model,
  attributes,
  reduxID,
  route,
  language,
  closed,
  clickHandlerOther
}) {
  return (
    !closed && (
      <div className={classnames ? classnames : ''} style={inlinestyle}>
        <Card
          clickHandlerClose={() => {
            store.dispatch(moduleStates({module_closed: true},reduxID))
          }}
          clickHandlerSubmit={e => {
            store.dispatch(formSubmits(reduxID,route))
          }}
          clickHandlerOther={clickHandlerOther}
          inputHandlerFocus={e => {
            // focus if it is needed
          }}
          inputHandlerChange={e => {
            store.dispatch(moduleStates(e,reduxID))
          }}
          contentArray={model}
          attributes={attributes}
          reduxID={reduxID}
          lang={language}
        />
      </div>
    )
  )
}
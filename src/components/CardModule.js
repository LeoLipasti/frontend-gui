import React, { Component } from 'react';
import Card from './modules/Card';
import { formSubmits } from '../redux/actions/modules/formSubmits';
import { moduleStates } from '../redux/actions/modules/moduleStates';
import store from '../redux/store/store';


export default function CardModule({
  attributes,
  model,
  componentStyle,
  reduxID,
  route,
  language,
  closed,
  clickHandlerOther
}) {
  return (
    (!closed &&
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
        componentStyle={componentStyle}
        lang={language}
      />
    )
  )
}
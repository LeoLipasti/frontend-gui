import React, { Component } from 'react';
import Frame from './modules/Frame';
import { formSubmits } from '../redux/actions/modules/formSubmits';
import { moduleStates } from '../redux/actions/modules/moduleStates';
import store from '../redux/store/store';


export default function FrameModule({
  attributes,
  model,
  componentStyle,
  reduxID,
  route,
  language,
  clickHandlerOther
}) {
  return (
    <Frame
      reduxID={reduxID}
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
      componentStyle={componentStyle}
      lang={language}
    />
  )
}
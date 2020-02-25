import React from 'react';

import FormEntries from './FormEntries';
import Buttons from './Buttons';

import groupContentArray from './functions/groupContentArray';

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'frame-1-'

// These module components display data attributes,
// defined by models.

// correct way to use this component:

// parameter          in/out  optional(null)
// -----------------------------------
// clickHandlerSubmit out     no
// clickHandlerOther  out     yes
// clickHandlerRedux  in      yes
// inputHandlerFocus  out     yes
// inputHandlerChange out     yes
// contentArray       in      no
// attributes         in      yes

// * clickHandlerSubmit :
//  on parent level, handle submit event, main event, login, submit states, etc.

// * clickHandlerOther :
//  on parent level, handle other event, cancel, back, register, etc.

// * clickHandlerRedux :
//  redux action. Must match an action defined in frameButtons.js.

// * inputHandlerFocus :
//  on parent level - input focus event.

// * inputHandlerChange :
//  on parent level - input change event. Use this to store data into state

// * contentArray :
//  content array defined in models. Must be given in correct format

// * attributes :
//  attributes as defaultValues displayed

// ------------------
// |                |
// |  input   input |
// |                |
// |  redux-button  |
// |                |
// |   i n p u t    |
// |  redux-button  |
// |                |
// |                |
// |  other  submit |
// ------------------

// supports html5 fields, as such
// no guarantee for browser support

/**
 *  !        WARNING            !
 *  ! Do not modify unless you  !
 *  ! know what you are doing.  !
 *  ! Editing this module will  !
 *  !   change EVERY frame.     !
 *  !        WARNING            !
 * 
 * @param {Function} clickHandlerSubmit
 * @param {Function} clickHandlerOther
 * @param {Function} inputHandlerFocus
 * @param {Function} inputHandlerChange
 * @param {Object} contentArray
 * @param {Array} attributes
 * @param {String} reduxID
 * @param {String} lang
 * 
 */
export default function Frame({
  clickHandlerSubmit,
  clickHandlerOther,
  inputHandlerFocus,
  inputHandlerChange,
  contentArray,
  attributes,
  reduxID,
  lang
}) {
  // this mobile layout only works if window is vertical on page load / refresh
  const groupedContentArray = groupContentArray(contentArray.fields);
  return (
    <form className={'frame_outer_container'}
    onSubmit = {e => {
        e.preventDefault();
        clickHandlerSubmit()
      }
    }>
        <div className={'container'} aria-live="polite">
        <h2>{contentArray.header}</h2>
        <br></br>
          {!!contentArray && (
            groupedContentArray.map((group, groupindex) => {
              return (
                <div className="row">
                  {!!group && group.map(
                    (entry, index) => {
                      return (
                        <FormEntries
                          inputHandlerFocus={inputHandlerFocus}
                          inputHandlerChange={inputHandlerChange}
                          attributes={attributes}
                          lang={lang}
                          entry={entry}
                          uniqkey={uniqkey1 + groupindex.toString() + reduxID + index.toString()}
                        />
                      );
                    }
                  )}
                </div>
              )
            })
          )}
        </div>
        <Buttons
          contentArray={contentArray}
          clickHandlerSubmit={clickHandlerSubmit}
          clickHandlerOther={clickHandlerOther}
          lang={lang}
          uniqkey={uniqkey1 + reduxID}
        />
    </form>
  );
}
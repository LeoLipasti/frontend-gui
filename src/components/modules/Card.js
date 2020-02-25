import React from 'react';

import FormEntries from './FormEntries';
import Buttons from './Buttons';

import close from '../../images/close.png';

import fonts from '../../style/rules/fonts'

import groupContentArray from './functions/groupContentArray';

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'card-1-'

// These module components display data attributes,
// defined by models.

// correct way to use this component:

// parameter          in/out  optional(null)
// -----------------------------------
// clickHandlerClose  out     yes
// clickHandlerSubmit out     no
// clickHandlerOther  out     yes
// clickHandlerRedux  in      yes
// inputHandlerFocus  out     yes
// inputHandlerChange out     yes
// contentArray       in      no
// attributes         in      yes

// * clickHandlerClose :
//  on parent level, handle closing of this card

// * clickHandlerSubmit :
//  on parent level, handle submit event, main event, login, submit states, etc.

// * clickHandlerOther :
//  on parent level, handle other event, cancel, back, register, etc.

// * clickHandlerRedux :
//  redux action. Must match an action defined in cardButtons.js.

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
 *  !   change EVERY card.      !
 *  !        WARNING            !
 * 
 * @param {Function} clickHandlerClose
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
export default function Card({
  clickHandlerClose,
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
    <div className={'card_outer_container'} style={{zIndex: 1000}}>
      <form className={'card_inner_container'}
      onSubmit = {e => {
          e.preventDefault();
          clickHandlerSubmit()
        }
      }>
          <div style={fonts.header}>
            { contentArray.header }
          </div>
          <div className={'card_menu_fill'}>
          {!!clickHandlerClose && (
            <div className={'card_menu_close'} aria-label="Close">
              <img
                src={close}
                alt='close'
                height='75%'
                align='right'
                onClick={() => clickHandlerClose()}
              />
            </div>
          )}
          </div>
          <div className={'overflow-auto card_inner_scroll'}>
            <div className={'container'} aria-live="polite">
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
                                uniqkey={uniqkey1 + index.toString() + reduxID + groupindex.toString()}
                              />
                            );
                          }
                        )}
                      </div>
                    )
                  })
              )}
            </div>
          </div>
          <Buttons
            contentArray={contentArray}
            clickHandlerSubmit={clickHandlerSubmit}
            clickHandlerOther={clickHandlerOther}
            lang={lang}
            uniqkey={uniqkey1 + reduxID}
          />
      </form>
    </div>
  );
}
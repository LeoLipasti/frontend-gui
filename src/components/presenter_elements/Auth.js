import React from 'react';

import validateLanguage from './utils/validateLanguage';

import FormEntries from './FormEntries';
import Buttons from './Buttons';

import fonts from '../../style/rules/fonts'

import groupContentArray from './utils/groupContentArray';

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'card-1-'

// These module components display data attributes,
// defined by models.

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
 * @param {Function} clickHandlerSubmit
 * @param {Function} clickHandlerOther
 * @param {Function} inputHandlerFocus
 * @param {Function} inputHandlerChange
 * @param {Object} contentArray
 * @param {Array} attributes
 * @param {String} reduxID
 * @param {String} lang
 * @param {String} callState
 * 
 */
export default function Auth({
  clickHandlerSubmit,
  clickHandlerOther,
  inputHandlerFocus,
  inputHandlerChange,
  contentArray,
  attributes,
  reduxID,
  lang,
  callState
}) {
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
            {validateLanguage(contentArray.header,lang)}
          </div>
          <div className={'card_menu_fill'}>
          </div>
          <div className={'card_inner_scroll'}>
            <div className={'container'} aria-live="polite">
              {!!contentArray && (
                  groupedContentArray.map((group, groupindex) => {
                    return (
                      <div>
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
                                callState={callState}
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
            clickHandlerOther={clickHandlerOther}
            lang={lang}
            uniqkey={uniqkey1 + reduxID}
          />
      </form>
    </div>
  );
}
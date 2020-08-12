import React from 'react';

import validateLanguage from './utils/validateLanguage';

import FormEntries from './FormEntries';
import Buttons from './Buttons';

import close from '../../images/close.png';

import fonts from '../../style/rules/fonts'

import groupContentArray from './utils/groupContentArray';

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'card-1-'

// Presenters -> (*)Card -> FormEntries

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
 * @param {String} callState
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
              {/* Card Form */}
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
                                callState={callState}
                                excludetypes={[]}
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
          {/* Buttons: submit | clickHandlerOther */}
          {/* submit triggers form submit. */}
          {/* clickHandlerOther is a function attribute for Presenter component */}
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
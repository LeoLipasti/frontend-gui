import React from 'react';

import FormEntries from './FormEntries';
import Buttons from './Buttons';

import groupContentArray from './utils/groupContentArray';

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'frame-1-'

// Presenters -> (*)Frame -> FormEntries

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
          {/* Frame Form */}
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
  );
}
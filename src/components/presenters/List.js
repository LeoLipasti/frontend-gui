import React from 'react';

import style from '../../style/modules/module-list-stylesheet';

import margins from '../../style/rules/margins'

import fonts from '../../style/rules/fonts'

import store from '../../redux/store/store';
import * as reduxButton from '../../redux/actions/modules/listButtons'
//import * as listSorting from '../../redux/actions/modules/listSorting'

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'list-1-'
const uniqkey2 = 'list-2-'

// These module components display data attributes,
// defined by models.

/**
 *  !        WARNING            !
 *  ! Do not modify unless you  !
 *  ! know what you are doing.  !
 *  ! Editing this module will  !
 *  !   change EVERY list.      !
 *  !        WARNING            !
 * 
 * @param {Object} contentArray
 * @param {Array} attributes
 * @param {String} reduxID
 * @param {String} lang
 * 
 */
export default function List({
  contentArray,
  attributes,
  reduxID,
  lang
}) {
  return (
    <div className={'list_inner_container'}>
      <div className={'list_inner_scroll'}>
      {!!attributes && (
        <div>
          {attributes.map((row, rowIndex) => {
            return (
              <div key={uniqkey1 + reduxID + rowIndex}>
                {!!contentArray && (
                  <div style={
                    style[contentArray.alignment]
                  }>
                    {contentArray.items.map((entry, index) => {
                      return (
                        <div key={uniqkey1 + reduxID + rowIndex + uniqkey2 + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                          {entry.type === 'text' && (
                            <div>
                              {attributes[rowIndex].attributes ? attributes[rowIndex].attributes[entry.db] : entry.placeholder}
                            </div>
                            )}
                          {entry.type === 'button' && (
                            <button
                              type={entry.type}
                              name={entry.action}
                              onClick={() => store.dispatch(reduxButton[entry.action](null))}
                              content={entry.name}
                            >
                            {entry.name}
                            </button>
                          )}
                        </div>
                        )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
      </div>
    </div>
  );
}
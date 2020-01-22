import React from 'react';

import style from '../style/modules/module-list-stylesheet';

import margins from '../style/rules/margins'

import sizes from '../style/rules/sizes'

import fonts from '../style/rules/fonts'

import units from '../style/rules/units'

import * as colors from '../style/rules/colors'

import store from '../redux/store/store';
import * as reduxButton from '../redux/actions/listButtons'
//import * as listSorting from '../redux/actions/listSorting'

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
 * @param {String} componentStyle
 * 
 */
export default function List({
  contentArray,
  attributes,
  componentStyle
}) {
  return (
    <div className={'list_inner_container'}>
      <div className={'list_inner_scroll'}>
      {!!attributes && (
        <div>
          {attributes.map((row, rowIndex) => {
            return (
              <div key={uniqkey1 + rowIndex}>
                {!!contentArray && (
                  <div style={
                    style[contentArray.alignment]
                  }>
                    {contentArray.items.map((entry, index) => {
                      return (
                        <div key={uniqkey1 + rowIndex + uniqkey2 + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                          {entry.type === 'text' && (
                            <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                              {attributes[rowIndex].attributes ? attributes[rowIndex].attributes[entry.db] : entry.placeholder}
                            </div>
                            )}
                          {entry.type === 'button' && (
                            <button
                              style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, margins.buttonMargin, sizes.inputField, sizes.borderReduxButton)}
                              type={entry.type}
                              name={entry.action}
                              onClick={() => store.dispatch(reduxButton[entry.action](null))}
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
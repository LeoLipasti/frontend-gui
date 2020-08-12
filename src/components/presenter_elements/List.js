import React from 'react';

import style from '../../style/modules/module-list-stylesheet';

import margins from '../../style/rules/margins'

import fonts from '../../style/rules/fonts'

import validateLanguage from './utils/validateLanguage';

import Tooltip from '@material-ui/core/Tooltip';

import store from '../../redux/store/store';
import * as reduxButton from '../../redux/actions/responses/listButtons'

import {sortDataList} from './utils/sortData'

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'list-1-'
const uniqkey2 = 'list-2-'

// Presenters -> (*)List

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
      {/* Scrollable List */}
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
                  {/* Model types: text | button */}
                    {contentArray.items.map((entry, index) => {
                      return (
                        <div key={uniqkey1 + reduxID + rowIndex + uniqkey2 + index} style={Object.assign({ width: entry.width }, margins.fieldMargin)}>
                          {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
                          {entry.type === 'text' && (
                            <span>
                              {!!entry.tooltip && 
                                <Tooltip title={entry.tooltip}>
                                  <div>
                                    {attributes[rowIndex].attributes ? attributes[rowIndex].attributes[entry.db] : entry.placeholder}
                                  </div>
                                </Tooltip>
                              }
                              {!entry.tooltip && 
                                <div>
                                  {attributes[rowIndex].attributes ? attributes[rowIndex].attributes[entry.db] : entry.placeholder}
                                </div>
                              }
                            </span>
                            )}
                          {entry.type === 'button' && (
                            <span>
                            {!!entry.tooltip && 
                              <Tooltip title={entry.tooltip}>
                                <button
                                  className='btn btn-primary'
                                  type={entry.type}
                                  name={entry.action}
                                  onClick={() => store.dispatch(reduxButton[entry.action](null))}
                                  content={entry.name}
                                  aria-label='List button'
                                >
                                {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
                                {validateLanguage(entry.title,lang)}
                                </button>
                              </Tooltip>
                            }
                            {!entry.tooltip && 
                              <button
                                className='btn btn-primary'
                                type={entry.type}
                                name={entry.action}
                                onClick={() => store.dispatch(reduxButton[entry.action](null))}
                                content={entry.name}
                                aria-label='List button'
                              >
                              {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
                              {validateLanguage(entry.title,lang)}
                              </button>
                            }
                            </span>
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
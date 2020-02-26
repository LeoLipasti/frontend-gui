import React from 'react';

import style from '../../style/modules/module-table-stylesheet';

import margins from '../../style/rules/margins'

import fonts from '../../style/rules/fonts'

import store from '../../redux/store/store';
import * as reduxButton from '../../redux/actions/modules/tableButtons'
import * as tableSorting from '../../redux/actions/modules/tableSorting'

import validateLanguage from './functions/validateLanguage';

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'table-1-'
const uniqkey2 = 'table-2-'

// These module components display data attributes,
// defined by models.

/**
 *  !        WARNING            !
 *  ! Do not modify unless you  !
 *  ! know what you are doing.  !
 *  ! Editing this module will  !
 *  !   change EVERY table.     !
 *  !        WARNING            !
 * 
 * @param {Object} contentArray
 * @param {Array} attributes
 * @param {String} reduxID
 * @param {String} lang
 * 
 */
export default function Table({
  contentArray,
  attributes,
  reduxID,
  lang
}) {
  const tableRows = new Array(25).fill('row');
  return (
    <div className={'table_inner_container'}>
      {!!contentArray && (
        <div style={
          style[contentArray.alignment]
        }>
          {contentArray.columns.map((entry, index) => {
            return (
              <div key={uniqkey2 + reduxID + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                <span class="btn btn-primary"
                  key={uniqkey2 + reduxID + index}
                  style={{overflow: 'hidden', cursor: 'pointer'}}
                  onClick={() => store.dispatch(
                    tableSorting.tableSort(
                      contentArray.type, entry.db
                    )
                  )}>
                  {validateLanguage(entry.title,lang)}
                </span>
              </div>
              )
          })}
        </div>
      )}
      {!!attributes && (
        <div>
          {attributes.map((row, rowIndex) => {
            return (
              <div key={uniqkey1 + reduxID + rowIndex}>
                {!!contentArray && (
                  <div style={
                    style[contentArray.alignment]
                  }>
                    {contentArray.columns.map((entry, index) => {
                      return (
                        <div key={uniqkey1 + reduxID + rowIndex + uniqkey2 + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                          {entry.type === 'text' && (
                            <div>
                              {attributes[rowIndex].attributes ? attributes[rowIndex].attributes[entry.db] : entry.placeholder}
                            </div>
                            )}
                          {entry.type === 'button' && (
                            <button
                                onClick={() => store.dispatch(reduxButton[entry.action](null))}
                                type={entry.type}
                                name={entry.action}
                                content={entry.name}>
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
      {contentArray.fillempty && tableRows.map((emptyrow, rowIndex) => {
        if (rowIndex-attributes.length >= 0) {
          return (
            <div style={
              style[contentArray.alignment]
            }>
              {contentArray.columns.map((entry, index) => {
                return (
                  <div key={uniqkey2 + reduxID + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                  </div>
                  )
              })}
            </div>
          )
        }
      })}
      {!!contentArray && (
        <div style={
          style[contentArray.alignment]
        }>
          {contentArray.columns.map((entry, index) => {
            return (
              <div key={uniqkey2 + reduxID + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                <span class="btn btn-primary" 
                  key={uniqkey2 + reduxID + index}
                  style={{overflow: 'hidden', cursor: 'pointer'}}
                  onClick={() => store.dispatch(
                    tableSorting.tableSort(
                      contentArray.type, entry.db
                    )
                  )}>
                  {validateLanguage(entry.title,lang)}
                </span>
              </div>
              )
          })}
        </div>
      )}
    </div>
  );
}
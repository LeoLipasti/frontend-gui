import React from 'react';

import style from '../style/modules/module-table-stylesheet';

import margins from '../style/rules/margins'

import sizes from '../style/rules/sizes'

import fonts from '../style/rules/fonts'

import units from '../style/rules/units'

import * as colors from '../style/rules/colors'

import store from '../redux/store/store';
import * as reduxButton from '../redux/actions/tableButtons'
import * as tableSorting from '../redux/actions/tableSorting'

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
 * @param {String} componentStyle
 * 
 */
export default function Table({
  contentArray,
  attributes,
  componentStyle
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
              <div key={uniqkey2 + index} style={Object.assign({ width: entry.width, overflow: units.hidden, cursor: 'pointer' }, margins.fieldMargin, fonts.title)} 
                onClick={() => store.dispatch(
                  tableSorting.tableSort(
                    contentArray.type, entry.db
                  )
                )}>
                {entry.title}
              </div>
              )
          })}
        </div>
      )}
      {!!attributes && (
        <div>
          {attributes.map((row, rowIndex) => {
            return (
              <div key={uniqkey1 + rowIndex}>
                {!!contentArray && (
                  <div style={
                    style[contentArray.alignment]
                  }>
                    {contentArray.columns.map((entry, index) => {
                      return (
                        <div key={uniqkey1 + rowIndex + uniqkey2 + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                          {entry.type === 'text' && (
                            <div style={Object.assign({ width: '100%', overflow: units.hidden }, margins.fieldMargin, fonts.title)}>
                              {attributes[rowIndex].attributes ? attributes[rowIndex].attributes[entry.db] : entry.placeholder}
                            </div>
                            )}
                          {entry.type === 'button' && (
                            <button
                              style={Object.assign({ width: '100%' , overflow: units.hidden, color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, margins.buttonMargin, sizes.inputField, sizes.borderReduxButton)}
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
      {contentArray.fillempty && tableRows.map((emptyrow, rowIndex) => {
        if (rowIndex-attributes.length >= 0) {
          return (
            <div style={
              style[contentArray.alignment]
            }>
              {contentArray.columns.map((entry, index) => {
                return (
                  <div key={uniqkey2 + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
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
              <div key={uniqkey2 + index} style={Object.assign({ width: entry.width }, margins.fieldMargin, fonts.title)}>
                {entry.title}
              </div>
              )
          })}
        </div>
      )}
    </div>
  );
}
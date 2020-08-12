import React from 'react';

import style from '../../style/modules/module-table-stylesheet';

import margins from '../../style/rules/margins'

import fonts from '../../style/rules/fonts'

import store from '../../redux/store/store';
import * as reduxButton from '../../redux/actions/responses/tableButtons'

import validateLanguage from './utils/validateLanguage';

import Tooltip from '@material-ui/core/Tooltip';

import {sortDataTable} from './utils/sortData'
import {applyFilters} from './utils/filterData'

// Form as filters
import FormEntries from './FormEntries';
import Buttons from './Buttons';
import groupContentArray from './utils/groupContentArray';
import { tableType } from "../../models/tsutils/tables/table"


// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'table-1-'
const uniqkey2 = 'table-2-'

// Presenters -> (*)Table

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
 * @param {Function} openfilters
 * @param {Boolean} displayfilters
 * @param {Function} inputHandlerFocus
 * @param {Array} attributes
 * @param {Array} excludefilters
 * 
 */
export default function Table({
  contentArray,
  attributes,
  reduxID,
  lang,
  openfilters,
  filtertoggle,
  filters,
  inputHandlerFocus,
  inputHandlerChange,
  excludefilters
}) {
  const tableRows = new Array(25).fill('row');
  // filter exclusion done here before sent to automated grouping
  const groupedContentArray = groupContentArray(
    !!excludefilters ? (
    contentArray.columns.filter(column => {
      return !excludefilters.includes(column.title)
    }))
     : contentArray.columns);
  return (
    <div>
    {/* Table Filters. Uses FormEntries same way as Card or Frame, hidden/shown with bootstrap collapse class */}
    <div  class="d-flex flex-row-reverse bd-highlight">
      <button class="btn btn-primary p-2 bd-highlight" onClick={() => openfilters()}>
        + Filters
      </button>
    </div>
    <div class={!filtertoggle ? "collapse" : ''}>
      <div class="card card-body">
        <form className={'frame_outer_container'}
          onSubmit = {e => e.preventDefault()}>
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
                                entry={Object.assign(entry, {width: '40%'})}
                                uniqkey={uniqkey1 + groupindex.toString() + reduxID + index.toString()}
                                excludetypes={[tableType.Button]}
                              />
                            );
                          }
                        )}
                      </div>
                    )
                  })
                )}
              </div>
          <button class="btn btn-primary float-right" onClick={() => applyFilters(filters,reduxID)}>
            Apply
          </button>
          <button class="btn btn-primary float-right" onClick={() => applyFilters(null,reduxID)}>
            Clear
          </button>
        </form>
      </div>
    </div>
    {/* Table HEAD */}
    <div className="table-responsive">
      <table className={'table'}>
        {!!contentArray && (
          <thead>
            <tr key={uniqkey2 + reduxID + '-thead'}>
              {contentArray.columns.map((entry, index) => {
                return (
                    <th>
                    {entry.type !== 'button' && (
                      <span>
                        {!!entry.tooltip && 
                          <Tooltip title={entry.tooltip}>
                            <span
                              key={uniqkey2 + reduxID + index}
                              style={{overflow: 'hidden', cursor: 'pointer'}}
                              onClick={() => sortDataTable(
                                  contentArray.type, entry.db
                                )
                              }>
                              {!!entry.icon && (
                                <span className={'fa fa-'+ entry.icon + ' table_headers'}></span>
                              )}
                              {validateLanguage(entry.title,lang)}
                            </span>
                          </Tooltip>
                        }
                        {!entry.tooltip && 
                          <span
                            key={uniqkey2 + reduxID + index}
                            style={{overflow: 'hidden', cursor: 'pointer'}}
                            onClick={() => sortDataTable(
                                contentArray.type, entry.db
                              )
                            }>
                            {!!entry.icon && (
                              <span className={'fa fa-'+ entry.icon + ' table_headers'}></span>
                            )}
                            {validateLanguage(entry.title,lang)}
                          </span>
                        }
                      </span>
                    )}
                    </th>
                )
              })}
              </tr>
          </thead>
        )}
        {/* Table Content. Model types: text | button */}
        {!!attributes && (
          <tbody>
              {attributes.map((row, rowIndex) => {
                return (
                  <tr key={uniqkey1 + reduxID + rowIndex}>
                    {!!contentArray && 
                        contentArray.columns.map((entry, index) => {
                          return (
                            <td>
                              <span key={uniqkey1 + reduxID + rowIndex + uniqkey2 + index}>
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
                                      <span
                                          onClick={() => store.dispatch(reduxButton[entry.action](null))}
                                          name={entry.action}
                                          content={entry.name}
                                          style={{overflow: 'hidden', cursor: 'pointer'}}
                                          >
                                        {entry.name}
                                        {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
                                      </span>
                                    </Tooltip>
                                  }
                                  {!entry.tooltip && 
                                    <span
                                        onClick={() => store.dispatch(reduxButton[entry.action](null))}
                                        name={entry.action}
                                        content={entry.name}
                                        style={{overflow: 'hidden', cursor: 'pointer'}}
                                        >
                                      {entry.name}
                                      {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
                                    </span>
                                  }
                                  </span>
                                )}
                              </span>
                            </td>
                            )
                        })}
                    </tr>
                )
              })}
          </tbody>
        )}
        {/* Table Fills to fill empty rows if used by developer */}
        {contentArray.fillempty && tableRows.map((emptyrow, rowIndex) => {
          if (rowIndex-attributes.length >= 0) {
            return (
              <tr>
                {contentArray.columns.map((entry, index) => {
                  return (
                    <td key={uniqkey2 + reduxID + index}>
                    </td>
                    )
                })}
              </tr>
            )
          }
        })}
        {/* Table HEAD lower access */}
        {!!contentArray && (
          <thead>
          <tr key={uniqkey2 + reduxID + '-thead-low'}>
            {contentArray.columns.map((entry, index) => {
              return (
                  <th>
                    {entry.type !== 'button' && (
                      <span>
                        {!!entry.tooltip && 
                          <Tooltip title={entry.tooltip}>
                            <span
                              key={uniqkey2 + reduxID + index}
                              style={{overflow: 'hidden', cursor: 'pointer'}}
                              onClick={() => sortDataTable(
                                  contentArray.type, entry.db
                                )
                              }>
                              {!!entry.icon && (
                                <span className={'fa fa-'+ entry.icon + ' table_headers'}></span>
                              )}
                              {validateLanguage(entry.title,lang)}
                            </span>
                          </Tooltip>
                        }
                        {!entry.tooltip && 
                          <span
                            key={uniqkey2 + reduxID + index}
                            style={{overflow: 'hidden', cursor: 'pointer'}}
                            onClick={() => sortDataTable(
                                contentArray.type, entry.db
                              )
                            }>
                            {!!entry.icon && (
                              <span className={'fa fa-'+ entry.icon + ' table_headers'}></span>
                            )}
                            {validateLanguage(entry.title,lang)}
                          </span>
                        }
                      </span>
                    )}
                  </th>
              )
            })}
          </tr>
          </thead>
        )}
      </table>
    </div>
  </div>
  );
}
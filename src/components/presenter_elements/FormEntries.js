import React from 'react';
import validateLanguage from './utils/validateLanguage';
import classNames from '../../style/bootstrap/classNames';
import ChartJS from '../chartjs/ChartJS'

import store from '../../redux/store/store';
import * as reduxButton from '../../redux/actions/requests/frameButtons'

import Tooltip from '@material-ui/core/Tooltip';

// Presenters -> Card/Frame -> (*)FormEntries

/**
 *  !        WARNING            !
 *  ! Do not modify unless you  !
 *  ! know what you are doing.  !
 *  ! Editing this module will  !
 *  !   change EVERY card.      !
 *  !        WARNING            !
 * 
 * @param {Function} inputHandlerFocus
 * @param {Function} inputHandlerChange
 * @param {Array} attributes
 * @param {String} lang
 * @param {Object} entry
 * @param {String} key,
 * @param {String} callState,
 * @param {Array} excludetypes
 * 
 */
export default function FormEntries({
  inputHandlerFocus,
  inputHandlerChange,
  attributes,
  lang,
  entry,
  uniqkey,
  callState,
  excludetypes
}) {
  return (
    entry.action !== 'submit' && entry.action !== 'other' && !excludetypes.includes(entry.type) && (
    <fieldset key={uniqkey}
    className={entry.showOnCallStatus ? ( entry.showOnCallStatus.includes(callState) ? 'form-group ' + !!entry.width && entry.width : 'd-none' ) : 'form-group ' + !!entry.width && entry.width}
      id={uniqkey+' label'}
      >
      {/* Icon */}
      {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
      <label htmlFor={uniqkey} className='bmd-label-static'>{entry.type !== 'button' && validateLanguage(entry.title,lang)}</label>
      {/* Image */}
      {entry.type === 'image' && entry.image && (
        <div id={uniqkey}>
          <img 
            src={entry.image} 
            width={entry.imageWidth ? entry.imageWidth : '100%'} 
            height='auto' 
            alt={entry.imageAlt ? entry.imageAlt : ""} 
            className={entry.imageClass ? entry.imageClass : ''}
          />
        </div>
      )}
      {/* ChartJs (if used inside a form) */}
      {entry.type === 'chart' && !!entry.charttype && !!entry.db && !!attributes && !!attributes[entry.db] && !!attributes[entry.db].labels && !!attributes[entry.db].data && (
          <ChartJS 
            className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
            type={entry.charttype}
            title={entry.title}
            labels={attributes[entry.db].labels}
            data={attributes[entry.db].data}
          />
      )}
      {/* Text Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'text' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                placeholder={validateLanguage(entry.placeholder,lang)}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                maxLength={entry.maxLength}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              placeholder={validateLanguage(entry.placeholder,lang)}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              maxLength={entry.maxLength}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Select Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'select' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <select
                placeholder={validateLanguage(entry.placeholder,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onClick={() => inputHandlerFocus()}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                id={uniqkey}
              >
            {entry.options.map((option, index) => {
              return (
                <option value={option.value} key={uniqkey + entry.db + index}>
                  {option.title}
                </option>
              )
            })}
            </select>
          </Tooltip>
        }
        {!entry.tooltip && 
          <select
            placeholder={validateLanguage(entry.placeholder,lang)}
            readOnly={!!entry.locked}
            className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
            required={!!entry.required}
            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
            onClick={() => inputHandlerFocus()}
            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
            id={uniqkey}
          >
        {entry.options.map((option, index) => {
          return (
            <option value={option.value} key={uniqkey + entry.db + index}>
              {option.title}
            </option>
          )
        })}
        </select>
      }
      </span>
      )}
      {/* Textarea Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'textarea' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <textarea
                placeholder={validateLanguage(entry.placeholder,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onClick={() => inputHandlerFocus()}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                rows={entry.rows}
                cols={entry.cols}
                name={validateLanguage(entry.db,lang)}
                maxLength={entry.maxLength}
                id={uniqkey}
              >
              </textarea>
            </Tooltip>
          }
          {!entry.tooltip && 
            <textarea
              placeholder={validateLanguage(entry.placeholder,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              onClick={() => inputHandlerFocus()}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              rows={entry.rows}
              cols={entry.cols}
              name={validateLanguage(entry.db,lang)}
              maxLength={entry.maxLength}
              id={uniqkey}
            >
            </textarea>
          }
        </span>
      )}
      {/* Display Text message. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'displaytxt' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <div
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              >
              {attributes && attributes[entry.db] ? attributes[entry.db] : null}
              {!attributes && entry.message ? validateLanguage(entry.message,lang) : attributes && attributes[entry.db] ? attributes[entry.db] : null}
              </div>
            </Tooltip>
          }
          {!entry.tooltip && 
            <div
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            >
            {attributes && attributes[entry.db] ? attributes[entry.db] : null}
            {!attributes && entry.message ? validateLanguage(entry.message,lang) : attributes && attributes[entry.db] ? attributes[entry.db] : null}
            </div>
          }
        </span>
      )}
      {/* Password Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'password' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                placeholder={validateLanguage(entry.placeholder,lang)}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                maxLength={entry.maxLength}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip &&
            <input
              type={entry.type}
              placeholder={validateLanguage(entry.placeholder,lang)}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              maxLength={entry.maxLength}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Radio Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'radio' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                defaultChecked={validateLanguage(entry.placeholder,lang)}
                name={validateLanguage(entry.name,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                maxLength={entry.maxLength}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              defaultChecked={validateLanguage(entry.placeholder,lang)}
              name={validateLanguage(entry.name,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              maxLength={entry.maxLength}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Checkbox Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'checkbox' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                defaultChecked={validateLanguage(entry.placeholder,lang)}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                maxLength={entry.maxLength}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              defaultChecked={validateLanguage(entry.placeholder,lang)}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              maxLength={entry.maxLength}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Color Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'color' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Date Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'date' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Datetime-local Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'datetime-local' && (
          <span>
            {!!entry.tooltip && 
              <Tooltip title={entry.tooltip}>
                <input
                  type={entry.type}
                  name={validateLanguage(entry.db,lang)}
                  readOnly={!!entry.locked}
                  className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                  required={!!entry.required}
                  defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                  onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                  onClick={() => inputHandlerFocus()}
                  id={uniqkey}
                />
              </Tooltip>
            }
            {!entry.tooltip && 
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            }
          </span>
      )}
      {/* Month Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'month' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Time Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'time' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Number Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'number' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                max={entry.max}
                min={entry.min}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              max={entry.max}
              min={entry.min}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Range Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'range' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                max={entry.max}
                min={entry.min}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              max={entry.max}
              min={entry.min}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* Tel Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'tel' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                max={entry.max}
                min={entry.min}
                pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
        </span>
      )}
      {/* Email Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'email' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
            <input
              type={entry.type}
              name={validateLanguage(entry.db,lang)}
              readOnly={!!entry.locked}
              className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
              required={!!entry.required}
              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
              onClick={() => inputHandlerFocus()}
              id={uniqkey}
            />
          }
        </span>
      )}
      {/* File Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'file' && (
        <span>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
            </Tooltip>
          }
          {!entry.tooltip && 
              <input
                type={entry.type}
                name={validateLanguage(entry.db,lang)}
                readOnly={!!entry.locked}
                className={!!entry.locked ? classNames.formcontrolplaintext : classNames.formcontrol}
                required={!!entry.required}
                defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                onClick={() => inputHandlerFocus()}
                id={uniqkey}
              />
          }
        </span>
      )}
      {/* Button (Redux) Field. Wrapped in Tooltip if tooltip given, otherwise not.*/}
      {entry.type === 'button' && entry.action !== 'submit' && entry.action !== 'other' && (
        <div className={!!entry.locked ? classNames.formcontrolplaintext + ' border-0' : classNames.formcontrol + ' border-0'}>
          {!!entry.tooltip && 
            <Tooltip title={entry.tooltip}>
              <button
                className='btn btn-primary'
                type={entry.type}
                name={entry.action}
                onClick={() => store.dispatch(reduxButton[entry.action](null))}
                id={uniqkey}
                aria-label='Form button'
              >
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
              id={uniqkey}
              aria-label='Form button'
            >
            {validateLanguage(entry.title,lang)}
            </button>
          }
        </div>
      )}
    </fieldset>
    )
  );
}
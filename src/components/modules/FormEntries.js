import React from 'react';
import validateLanguage from './functions/validateLanguage';
import classNames from '../../style/bootstrap/classNames';

import store from '../../redux/store/store';
import * as reduxButton from '../../redux/actions/modules/frameButtons'


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
 * 
 */
export default function FormEntries({
  inputHandlerFocus,
  inputHandlerChange,
  attributes,
  lang,
  entry,
  uniqkey
}) {
  return (
    entry.action !== 'submit' && entry.action !== 'other' && (
    <fieldset key={uniqkey}
      className={'form-group ' + !!entry.width && entry.width}
      id={uniqkey+' label'}
      >
      <label htmlFor={uniqkey} className='bmd-label-static'>{entry.type !== 'button' && validateLanguage(entry.title,lang)}</label>
      {entry.type === 'text' && (
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
      )}
      {entry.type === 'select' && (
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
      )}
      {entry.type === 'textarea' && (
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
      )}
      {entry.type === 'displaytxt' && (
        <div
          onClick={() => inputHandlerFocus()}
          id={uniqkey}
        >
        {entry.message ? entry.message : attributes[entry.db]}
        </div>
      )}
      {entry.type === 'password' && (
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
      )}
      {entry.type === 'radio' && (
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
      )}
      {entry.type === 'checkbox' && (
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
      )}
      {entry.type === 'color' && (
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
      )}
      {entry.type === 'date' && (
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
      )}
      {entry.type === 'datetime-local' && (
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
      )}
      {entry.type === 'month' && (
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
      )}
      {entry.type === 'time' && (
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
      )}
      {entry.type === 'number' && (
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
      )}
      {entry.type === 'range' && (
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
      )}
      {entry.type === 'tel' && (
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
      )}
      {entry.type === 'email' && (
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
      )}
      {entry.type === 'file' && (
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
      )}
      {entry.type === 'button' && entry.action !== 'submit' && entry.action !== 'other' && (
        <div className={!!entry.locked ? classNames.formcontrolplaintext + ' border-0' : classNames.formcontrol + ' border-0'}>
          <button
            className='btn btn-outline-secondary btn-block'
            type={entry.type}
            name={entry.action}
            onClick={() => store.dispatch(reduxButton[entry.action](null))}
            id={uniqkey}
            aria-label='Form button'
          >
          {validateLanguage(entry.title,lang)}
          </button>
        </div>
      )}
    </fieldset>
    )
  );
}
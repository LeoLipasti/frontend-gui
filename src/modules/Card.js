import React from 'react';

import style from '../style/modules/module-card-stylesheet';

import close from '../images/close.png';

import margins from '../style/rules/margins'

import sizes from '../style/rules/sizes'

import fonts from '../style/rules/fonts'

import units from '../style/rules/units'


import * as colors from '../style/rules/colors'

import store from '../redux/store/store';
import * as reduxButton from '../redux/actions/cardButtons'

import validateLanguage from './validateLanguage';

// unique react keys used in Array maps as index + key
// use file names for consistency
const uniqkey1 = 'card-1-'

// These module components display data attributes,
// defined by models.

// correct way to use this component:

// parameter          in/out  optional(null)
// -----------------------------------
// clickHandlerClose  out     yes
// clickHandlerSubmit out     no
// clickHandlerOther  out     yes
// clickHandlerRedux  in      yes
// inputHandlerFocus  out     yes
// inputHandlerChange out     yes
// contentArray       in      no
// attributes         in      yes
// componentStyle     in      yes

// * clickHandlerClose :
//  on parent level, handle closing of this card

// * clickHandlerSubmit :
//  on parent level, handle submit event, main event, login, submit states, etc.

// * clickHandlerOther :
//  on parent level, handle other event, cancel, back, register, etc.

// * clickHandlerRedux :
//  redux action. Must match an action defined in cardButtons.js.

// * inputHandlerFocus :
//  on parent level - input focus event.

// * inputHandlerChange :
//  on parent level - input change event. Use this to store data into state

// * contentArray :
//  content array defined in models. Must be given in correct format

// * attributes :
//  attributes as defaultValues displayed

// * componentStyle :
//  componentStyle from stylesheet. If not given then uses default

// ------------------
// |                |
// |  input   input |
// |                |
// |  redux-button  |
// |                |
// |   i n p u t    |
// |  redux-button  |
// |                |
// |                |
// |  other  submit |
// ------------------

// supports html5 fields, as such
// no guarantee for browser support

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
 * @param {String} componentStyle
 * @param {String} lang
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
  componentStyle,
  lang
}) {
  const assignStyle = componentStyle ? style[componentStyle] : style['default'];
  // this mobile layout only works if window is vertical on page load / refresh
  const queryStyle = window.innerWidth / window.innerHeight > 1 ? assignStyle : style['mobile']
  return (
    <div className={'card_outer_container'}>
      <form className={'card_inner_container'}
      onSubmit = {e => {
          e.preventDefault();
          clickHandlerSubmit()
        }
      }>
          <div style={fonts.header}>
            { contentArray.header }
          </div>
          <div className={'card_menu_fill'}>
          {!!clickHandlerClose && (
            <div className={'card_menu_close'}>
              <img
                src={close}
                alt='cancel'
                height='75%'
                align='right'
                onClick={() => clickHandlerClose()}
              />
            </div>
          )}
          </div>
          <div className={'card_inner_scroll'}>
            {!!contentArray && (
              <div style={
                style[contentArray.alignment]
              }>
                {contentArray.offset1st && (
                    <div className='card_content_offset'>
                    </div>
                  )
                }
                {contentArray.fields.map((entry, index) => {
                  return (
                    entry.action !== 'submit' && entry.action !== 'other' && (
                    <div key={uniqkey1 + index}
                      style={
                        Object.assign(
                          { width: entry.width },
                          queryStyle,
                          entry.type === 'textarea' && ({height: (entry.rows * 1.5) + units.rem})
                        )
                      }>
                      {entry.type === 'text' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            type={entry.type}
                            placeholder={validateLanguage(entry.placeholder,lang)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            maxLength={entry.maxLength}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'select' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <select
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            placeholder={validateLanguage(entry.placeholder,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onClick={() => inputHandlerFocus()}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                          >
                          {entry.options.map((option, index) => {
                            return (
                              <option value={option.value} key={entry.db + index}>
                                {option.title}
                              </option>
                            )
                          })}
                          </select>
                        </div>
                      )}
                      {entry.type === 'textarea' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <textarea
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.borderInput)}
                            placeholder={validateLanguage(entry.placeholder,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onClick={() => inputHandlerFocus()}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            rows={entry.rows}
                            cols={entry.cols}
                            name={validateLanguage(entry.db,lang)}
                            maxLength={entry.maxLength}
                          >
                          </textarea>
                        </div>
                      )}
                      {entry.type === 'displaytxt' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <div
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, fonts.paragraph, sizes.borderInput)}
                            onClick={() => inputHandlerFocus()}
                            id={'card-'+entry.db}
                          >
                          {entry.message ? entry.message : attributes[entry.db]}
                          </div>
                        </div>
                      )}
                      {entry.type === 'password' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            type={entry.type}
                            placeholder={validateLanguage(entry.placeholder,lang)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            maxLength={entry.maxLength}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'radio' && (
                        <div style={Object.assign({ width: '100%' }, margins.radioMargin, fonts.paragraph)}>
                        <span style={{ width: '100%', visibility: 'hidden' }}>Hidden</span>
                        <div style={Object.assign({ width: '100%' }, sizes.radioButton)}>
                          <input
                            style={{ color: colors[entry.color], backgroundColor: colors[entry.bg_color] }}
                            type={entry.type}
                            defaultChecked={validateLanguage(entry.placeholder,lang)}
                            name={validateLanguage(entry.name,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            maxLength={entry.maxLength}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                          {validateLanguage(entry.title,lang)}
                        </div>
                      </div>
                      )}
                      {entry.type === 'checkbox' && (
                        <div style={Object.assign({ width: '100%' }, margins.radioMargin, fonts.paragraph)}>
                          <span style={{ width: '100%', visibility: 'hidden' }}>Hidden</span>
                          <div style={Object.assign({ width: '100%' }, sizes.radioButton)}>
                            <input
                              style={{ color: colors[entry.color], backgroundColor: colors[entry.bg_color] }}
                              type={entry.type}
                              defaultChecked={validateLanguage(entry.placeholder,lang)}
                              name={validateLanguage(entry.db,lang)}
                              readOnly={!!entry.locked}
                              required={!!entry.required}
                              defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                              maxLength={entry.maxLength}
                              onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                              onClick={() => inputHandlerFocus()}
                            />
                            {validateLanguage(entry.title,lang)}
                          </div>
                        </div>
                      )}
                      {entry.type === 'color' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.colorField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'date' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'datetime-local' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'month' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'time' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'number' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            max={entry.max}
                            min={entry.min}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'range' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            max={entry.max}
                            min={entry.min}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'tel' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            max={entry.max}
                            min={entry.min}
                            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'email' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'file' && (
                        <div style={Object.assign({ width: '100%' }, margins.fieldMargin, fonts.title)}>
                        {validateLanguage(entry.title,lang)}
                          <input
                            type={entry.type}
                            style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, sizes.inputField, sizes.borderInput)}
                            name={validateLanguage(entry.db,lang)}
                            readOnly={!!entry.locked}
                            required={!!entry.required}
                            defaultValue={validateLanguage(attributes ? attributes[entry.db] : '',lang)}
                            onChange={e => inputHandlerChange({ [entry.db]: e.target.value })}
                            onClick={() => inputHandlerFocus()}
                          />
                        </div>
                      )}
                      {entry.type === 'button' && entry.action !== 'submit' && entry.action !== 'other' && (
                        <div style={Object.assign({ width: '100%' }, sizes.inputField)}>
                          <span style={{ width: '100%', visibility: 'hidden' }}>Hidden</span>
                          <button
                            style={Object.assign({ width: '95%', marginLeft: '2.5%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, margins.buttonMargin, sizes.inputField, sizes.borderReduxButton)}
                            type={entry.type}
                            name={entry.action}
                            onClick={() => store.dispatch(reduxButton[entry.action](null))}
                          >
                          {validateLanguage(entry.title,lang)}
                          </button>
                        </div>
                      )}
                    </div>
                    )
                  );
                })}
              </div>
            )}
          </div>
          {!!contentArray && (
            <div style={
              style[contentArray.alignment]
            }>
              {contentArray.fields.map((entry, index) => {
                return (
                  !!entry.action && entry.type === 'button' && entry.action === 'other' && (
                    <div key={'other' + uniqkey1 + index}
                      style={
                        Object.assign(
                          { width: entry.width }, queryStyle, { height: '2.5rem', marginLeft: 0.3 + units.rem, marginRight: 0.3 + units.rem }
                        )
                      }>
                      <button
                        style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, margins.buttonMargin, sizes.borderButton)}
                        type={entry.type}
                        name={entry.action}
                        onClick={() => clickHandlerOther()}
                      >
                      {validateLanguage(entry.title,lang)}
                      </button>
                    </div>
                  )
                )
              })}
              {contentArray.fields.map((entry, index) => {
                return (
                  !!entry.action && entry.type === 'button' && entry.action === 'submit' && (
                    <div key={'submit' + uniqkey1 + index}
                      style={
                        Object.assign(
                          { width: entry.width }, queryStyle, { height: '2.5rem', marginLeft: 0.3 + units.rem, marginRight: 0.3 + units.rem }
                        )
                      }>
                      <input
                        style={Object.assign({ width: '100%', color: colors[entry.color], backgroundColor: colors[entry.bg_color] }, margins.buttonMargin, sizes.borderButton)}
                        type='submit'
                        name={entry.action}
                        value={validateLanguage(entry.title,lang)}
                        onClick={() => clickHandlerSubmit()}
                      />
                    </div>
                  )
                )
              })}
            </div>
          )}
      </form>
    </div>
  );
}
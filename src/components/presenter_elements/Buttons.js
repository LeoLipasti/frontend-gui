import React from 'react';
import validateLanguage from './utils/validateLanguage';

/**
 *  !        WARNING            !
 *  ! Do not modify unless you  !
 *  ! know what you are doing.  !
 *  ! Editing this module will  !
 *  !   change EVERY card.      !
 *  !        WARNING            !
 * 
 * @param {Array} contentArray
 * @param {Function} clickHandlerOther
 * @param {String} lang,
 * @param {String} uniqkey,
 */
export default function Buttons({
  contentArray,
  clickHandlerOther,
  lang,
  uniqkey
}) {
  return (
    !!contentArray && (
      <div className="d-flex justify-content-center">
        {/* Button triggers clickHandlerOther attribute function in Presenter */}
        {contentArray.fields.map((entry, index) => {
          return (
            !!entry.action && entry.type === 'button' && entry.action === 'other' && (
              <div key={'other-' + uniqkey + '' +  index.toString()}>
                {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
                <button
                  className="btn btn-primary mr-2"
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
        {/* Button triggers form submit */}
        {contentArray.fields.map((entry, index) => {
          return (
            !!entry.action && entry.type === 'button' && entry.action === 'submit' && (
              <div key={'submit-' + uniqkey + '' + index.toString()}>
                {!!entry.icon && (<span className={'fa fa-'+ entry.icon}></span>)}
                <input
                  className="btn btn-primary mr-2"
                  type='submit'
                  name={entry.action}
                  value={validateLanguage(entry.title,lang)}
                />
              </div>
            )
          )
        })}
      </div>
    )
  )
}
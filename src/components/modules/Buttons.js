import React from 'react';
import validateLanguage from './functions/validateLanguage';

/**
 *  !        WARNING            !
 *  ! Do not modify unless you  !
 *  ! know what you are doing.  !
 *  ! Editing this module will  !
 *  !   change EVERY card.      !
 *  !        WARNING            !
 * 
 * @param {Array} contentArray
 * @param {Function} clickHandlerSubmit
 * @param {Function} clickHandlerOther
 * @param {String} lang,
 * @param {String} uniqkey,
 */
export default function FormEntries({
  contentArray,
  clickHandlerSubmit,
  clickHandlerOther,
  lang,
  uniqkey
}) {
  return (
    !!contentArray && (
      <div className="d-flex justify-content-center">
        {contentArray.fields.map((entry, index) => {
          return (
            !!entry.action && entry.type === 'button' && entry.action === 'other' && (
              <div key={'other-' + uniqkey + '' +  index.toString()}>
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
        {contentArray.fields.map((entry, index) => {
          return (
            !!entry.action && entry.type === 'button' && entry.action === 'submit' && (
              <div key={'submit-' + uniqkey + '' + index.toString()}>
                <input
                  className="btn btn-primary mr-2"
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
    )
  )
}
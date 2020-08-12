import store from '../../../redux/store/store';
import { res_responseStates } from '../../../redux/actions/responses/responseStates'
import localFilter from './localFilter'

/**
 * 
 * @param {String | null} filters 
 * @param {String} reduxID 
 */
export function applyFilters(filters, reduxID) {

  if (filters !== null) {

    // data contains also filtertoggle which we don't use
    const newFilters = Object.assign({}, filters)
    delete newFilters['filtertoggle'];

    const results = store.getState().res_responseStates[reduxID];

    // local sorting if no need for a call (less or equal to 1 page of results)

    if (!!results && results.length > 1 && results.length <= 25) {
      const filterData = localFilter(results, newFilters, reduxID + '-filter');
      const dispatchData = { data: filterData, type: reduxID + '-filter' };
      store.dispatch(res_responseStates(dispatchData));
    
    } else {
      // new fetch call here
    }
  } else {
    // with null filters clear filters
    const results = store.getState().res_responseStates[reduxID];
    const dispatchData = { data: results, type: reduxID + '-filter' };
    store.dispatch(res_responseStates(dispatchData));
  }
}
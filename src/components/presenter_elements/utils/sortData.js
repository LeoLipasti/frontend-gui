import store from '../../../redux/store/store';
import { res_responseStates } from '../../../redux/actions/responses/responseStates'
import { tableSort } from '../../../redux/actions/responses/tableSorting'
import { listSort } from '../../../redux/actions/responses/listSorting'
import localSort from './localSort'

/**
 * 
 * @param {String} tableName 
 * @param {String} sort 
 */
export function sortDataTable(tableName, sort) {
  // desc toggle
  const res_tableSorting = store.getState().res_tableSorting;
  const desc = !!res_tableSorting && !!res_tableSorting[tableName] ? !res_tableSorting[tableName].desc : false
  store.dispatch(tableSort( tableName, sort, desc ));

  let results = store.getState().res_responseStates[tableName];

  const resultsfiltered = store.getState().res_responseStates[tableName + '-filter'];

  // if locally filtered already
  if (!!resultsfiltered) {
    results = resultsfiltered;
  }

  // local sorting if no need for a call (less or equal to 1 page of results)

  if (!!results && results.length > 1 && results.length <= 25) {
    const sortData = localSort(results, sort, desc);
    const dispatchData = { data: sortData, type: !!resultsfiltered ? tableName + '-filter' : tableName };
    store.dispatch(res_responseStates(dispatchData));
  
  } else {
    // new fetch call here
  }
}

/**
 * 
 * @param {String} listName 
 * @param {String} sort 
 */
export function sortDataList(listName, sort) {
  const res_listSorting = store.getState().res_listSorting;
  const desc = !!res_listSorting && !!res_listSorting[listName] ? !res_listSorting[listName].desc : false
  store.dispatch(listSort( listName, sort, desc ));
  const results = store.getState().res_responseStates[listName];

  // local sorting if no need for a call (less or equal to 1 page of results)

  if (!!results && results.length > 1 && results.length <= 25) {
    const sortData = localSort(results, sort, desc);
    const dispatchData = { data: sortData, type: listName };
    store.dispatch(res_responseStates(dispatchData));
  
  } else {
    // new fetch call here
  }
}
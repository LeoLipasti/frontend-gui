import store from '../../store/store';
import { tableData } from './tableData'

export async function tableSort(tableName, sort) {
  const tableSorting = store.getState().tableSorting;
  const desc = !!tableSorting ? !tableSorting[tableName].desc : false
  const results = store.getState().tableData[tableName];
  // local sorting if no need for a call (less or equal to 1 page of results)
  if (!!results && results.length > 1 && results.length <= 25) {
    store.dispatch(tableData({ data: localSort(results, sort, desc), tablename: tableName }));
  } else {
    // new fetch call here
  }
  return {
    type: 'TABLE_SORT',
    sortdata: { 
      sort: sort, 
      desc: desc
    },
    tablename: tableName
  }
}

function localSort(results, sorter, desc) {
  const sortArray = [];
  results.forEach(element => {
    sortArray.push({ sorter: element.attributes[sorter], original: element });
  });
  sortArray.sort(function (a, b) {
    return a.sorter - b.sorter;
  });
  if (desc) {
    sortArray.reverse();
  }
  const sortedArray = [];
  sortArray.forEach(element => {
    sortedArray.push(element.original);
  });
  return sortedArray;
}
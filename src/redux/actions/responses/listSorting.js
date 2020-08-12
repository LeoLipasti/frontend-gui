export function listSort(listName, sort, desc) {
  return {
    type: 'LIST_SORT',
    sortdata: { 
      sort: sort, 
      desc: desc
    },
    listName: listName
  }
}
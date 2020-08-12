export function tableSort(tableName, sort, desc) {
  return {
    type: 'TABLE_SORT',
    sortdata: { 
      sort: sort, 
      desc: desc
    },
    tablename: tableName
  }
}
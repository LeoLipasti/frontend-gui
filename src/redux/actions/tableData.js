export async function tableData(table) {
  console.log(table);
  return {
    type: 'TABLE_ACTION',
    tabledata: table.data,
    tablename: table.tablename
  };
}
export async function tableData(table) {
  console.log(table);
  console.log("data: " + table);
  return {
    type: 'TABLE_ACTION',
    tabledata: table.data,
    tablename: table.tablename
  };
}
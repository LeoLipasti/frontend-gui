import { tableType } from "./table"
// table-type has to match with data and is used to link table names for redux
// feel free to use more typescript here to reduce typing errors
const sampleTable = {
  columns: [
    {
      title: '',
      type: tableType.Button,
      action: 'sampleAction',
      image: 'icon-eye',
      width: '5%'
    },
    {
      title: 'name',
      type: tableType.Text,
      db: 'name',
      placeholder: 'undefined',
      width: '20%'
    },
    {
      title: 'country',
      type: tableType.Text,
      db: 'country',
      placeholder: 'undefined',
      width: '15%'
    },
    {
      title: 'year',
      type: tableType.Text,
      db: 'year',
      placeholder: 'undefined',
      width: '15%'
    },
    {
      title: 'test',
      type: tableType.Text,
      db: 'sampleString',
      placeholder: 'undefined',
      width: '20%'
    },
    {
      title: 'sampleInteger',
      type: tableType.Text,
      db: 'sampleInteger',
      placeholder: 'undefined',
      width: '20%'
    },
  ],
  header: 'Sample table',
  alignment: 'left',
  type: 'sampleProfiles',
  fillempty: false
};

export default sampleTable;
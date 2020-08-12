export enum tableType {
  Text = 'text',
  Button = 'button',
}

interface Column {
  title: string,
  type: string,
  action?: string,
  image?: string,
  db?: string,
  placeholder?: string,
  width: string
}

interface Table {
  columns: Array<Column>,
  header?: string,
  alignment?: string,
  type: string,
  fillempty?: boolean
}

export function typecheckTable(table: Table) {
  return table;
}
export enum ItemType {
  Text = 'text',
  Button = 'button',
}

interface Item {
  title: string,
  type: string,
  action?: string,
  image?: string,
  db?: string,
  placeholder?: string,
  width: string
}

interface List {
  items: Array<Item>,
  alignment?: string,
  type: string
}

export function typecheckList(list: List) {
  return list;
}
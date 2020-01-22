export enum FieldType {
  Displaytxt = 'displaytxt',
  Text = 'text',
  Password = 'password',
  Select = 'select',
  Textarea = 'textarea',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Color = 'color',
  File = 'file',
  Number = 'number',
  Tel = 'tel',
  Range = 'range',
  Date = 'date',
  Datetimelocal = 'datetime-local',
  Time = 'time',
  Month = 'month',
  Button = 'button',
}

interface Options {
  title: string,
  db: string
}

interface Field {
  title: string,
  type: string,
  action?: string,
  image?: string,
  db?: string,
  placeholder?: string | boolean,
  maxLength?: string,
  color?: string,
  bg_color?: string,
  max?: Number,
  min?: Number,
  rows?: string,
  cols?: string,
  locked?: string,
  message?: string,
  options?: Array<Options>,
  width: string
}

interface Card {
  fields: Array<Field>,
  header: string,
  alignment?: string
}

export function typecheckCard(card: Card) {
  return card;
}
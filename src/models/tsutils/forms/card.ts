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
  RowStart = 'row-start',
  RowEnd = 'row-end',
  Image = 'image',
  Chart = 'chart',
}

export enum ChartType {
  Bar = 'bar',
  Bubble = 'bubble',
  Line = 'line',
  Pie = 'pie',
  Polar = 'polarArea',
  Radar = 'radar',
}

export enum BootStrap {
  colsm = 'col-sm',
  colmd = 'col-md',
}

interface Options {
  title: string,
  db: string
}

interface Field {
  title?: string,
  type: string,
  action?: string,
  image?: string,
  imageAlt?: string,
  imageWidth?: string,
  imageClass?: string,
  db?: string,
  placeholder?: string | boolean,
  maxLength?: string,
  max?: Number,
  min?: Number,
  rows?: string,
  cols?: string,
  locked?: string,
  message?: string,
  options?: Array<Options>,
  width?: string,
  showOnCall?: boolean
}

interface Card {
  fields: Array<Field>,
  header: string
}

export function typecheckCard(card: Card) {
  return card;
}
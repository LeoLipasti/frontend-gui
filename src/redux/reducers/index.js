import { combineReducers } from 'redux'

import cardButtons from './cardButtons'
import frameButtons from './frameButtons'
import tableButtons from './tableButtons'
import tableSorting from './tableSorting'
import tableData from './tableData'

export default combineReducers({
  cardButtons,
  frameButtons,
  tableButtons,
  tableSorting,
  tableData,
})
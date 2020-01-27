import { combineReducers } from 'redux'

import appPath from './appPath'
import cardButtons from './cardButtons'
import frameButtons from './frameButtons'
import tableButtons from './tableButtons'
import tableSorting from './tableSorting'
import tableData from './tableData'

export default combineReducers({
  appPath,
  cardButtons,
  frameButtons,
  tableButtons,
  tableSorting,
  tableData
})
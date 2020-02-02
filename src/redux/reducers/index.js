import { combineReducers } from 'redux'

import appPath from './routes/appPath'
import cardButtons from './modules/cardButtons'
import frameButtons from './modules/frameButtons'
import tableButtons from './modules/tableButtons'
import tableSorting from './modules/tableSorting'
import tableData from './modules/tableData'
import moduleStates from './modules/moduleStates'
import formSubmits from './modules/formSubmits'

export default combineReducers({
  appPath,
  cardButtons,
  frameButtons,
  tableButtons,
  tableSorting,
  tableData,
  moduleStates,
  formSubmits
})
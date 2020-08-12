import { combineReducers } from 'redux'
import req_requestStates from './requests/requestStates'
import req_formSubmits from './requests/formSubmits'
import req_cardButtons from './requests/cardButtons'
import req_frameButtons from './requests/frameButtons'
import res_responseStates from './responses/responseStates'
import res_tableButtons from './responses/tableButtons'
import res_tableSorting from './responses/tableSorting'
import appPath from './static/appPath'
import modelStates from './static/modelStates'

export default combineReducers({
  req_requestStates,
  req_formSubmits,
  req_cardButtons,
  req_frameButtons,
  res_responseStates,
  res_tableSorting,
  res_tableButtons,
  appPath,
  modelStates
})
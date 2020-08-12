export default function(state, action) {
  // this is a log but anything could be implemented here if needed
  // for example undo-data recovery
  switch (action.type) {
    case 'FORM_SUBMITS':
      state = {
        ...state,
        [action.reduxID]: '/'+action.route
      }
      return state;
    default:
      return !!state ? state : null
  }
}

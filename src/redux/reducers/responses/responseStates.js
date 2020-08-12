export default function(state, action) {
  switch (action.type) {
    case 'RESPONSE_STATES':
      state = {
        ...state,
        [action['response-type']]: action['response-data']
      }
      return state;
    default:
      return !!state ? state : null
  }
}

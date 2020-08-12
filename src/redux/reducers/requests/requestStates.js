export default function(state, action) {
  switch (action.type) {
    case 'REQUEST_STATES':
      state = {
        ...state,
        [action['request-type']]: Object.assign(
          {},
          !!state ? state[action['request-type']] : {},
          action['request-data']
        )}
      return state;
    default:
      return !!state ? state : null
  }
}

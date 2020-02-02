export default function(state, action) {
  console.log(state);
  console.log(action.stateName);
  switch (action.type) {
    case 'MODULE_STATES':
      state = {
        ...state,
        [action.stateName]: Object.assign(
          {},
          !!state ? state[action.stateName] : {},
          action[action.stateName]
        )}
      return state;
    default:
      return !!state ? state : null
  }
}

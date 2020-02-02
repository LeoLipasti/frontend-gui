export default function(state, action) {
  switch (action.type) {
    case 'FORM_SUBMITS':
      state = {
        ...state,
        null: null
      }
      return state;
    default:
      return !!state ? state : null
  }
}

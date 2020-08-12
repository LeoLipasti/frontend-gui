export default function(state, action) {
  switch (action.type) {
    case 'STATIC_MODELS':
      state = {
        ...state,
        [action.model]: action.data
      }
      return state;
    default:
      return !!state ? state : null
  }
}

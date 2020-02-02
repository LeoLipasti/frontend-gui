export default function(state, action) {
  switch (action.type) {
    case 'TABLE_SORT':
      state = {
        ...state,
        [action.tablename]: action.sortdata
      }
      return state;
    default:
      return !!state ? state : null
  }
}

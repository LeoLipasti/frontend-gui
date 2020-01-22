export default function(state, action) {
  switch (action.type) {
    case 'TABLE_ACTION':
      state = {
        ...state,
        [action.tablename]: action.tabledata
      }
      return state;
    default:
      return !!state ? state : null
  }
}

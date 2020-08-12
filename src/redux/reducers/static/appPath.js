export default function(state, action) {
  switch (action.type) {
    case 'STATIC_APP_PATH':
      state = {
        ...state,
        'appPath': action['appPath']
      }
      return state;
    default:
      return !!state ? state : { 'appPath': "de" }
  }
}

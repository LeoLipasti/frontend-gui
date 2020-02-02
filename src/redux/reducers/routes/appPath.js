// todo: make sure appPath is a valid lang code. eg. de, en
export default function(state, action) {
  switch (action.type) {
    case 'APP_PATH':
      state = {
        ...state,
        appPath: action.appPath
      }
      return state;
    default:
      return !!state ? state : { appPath: "de" }
  }
}

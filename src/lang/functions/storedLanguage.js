import store from "../../redux/store/store"
import { appPath } from '../../redux/actions/static/appPath'

export default function storedLanguage() {
  let language;
  const languagekey = sessionStorage.getItem('language');
  if (!!languagekey) {
    language = languagekey;
  } else {
    // default
    sessionStorage.setItem('language', 'de');
    language = "de";
  }
  store.dispatch(appPath(language));
  return language;
}
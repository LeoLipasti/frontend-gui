import { appPath } from '../redux/actions/static/appPath'
import {
  useLocation
} from "react-router-dom";
/**
 * In case you need to override dynamic routing import this file
 * Disables spa-languages and uses single language specified here
 */
export function useDynamicRouting(queryUrl, langfile, language, store) {

  let fixedLanguage = 'en';
  
  // React router dom useLocation
  let location = useLocation();

  // Parse language from path ending
  // in order to change SPA-language
  let newlang = location.pathname.split("/").slice(-1)[0];
  if (!!langfile[newlang]) {
    store.dispatch(appPath(newlang));
    language = newlang;
    // overriden //// overriden //// overriden //
    language = fixedLanguage;
    sessionStorage.setItem('language', language);
  }

  // Push route to window history
  if (!window.history.state) {
    window.history.pushState({ prevUrl: location.pathname}, null, location.pathname)
  }

  // Query field used for returning to a page inside SPA
  if (!!location.search) {
    queryUrl = location.search.replace("?","");
    window.history.pushState({ prevUrl: location.pathname}, null, location.pathname)
    
    // REDIRECT - Language redirect
    let queryLang = location.search.split("/").slice(-1)[0];
    if (!!langfile[queryLang]) {
      store.dispatch(appPath(queryLang));
      language = queryLang;
      sessionStorage.setItem('language', language);
    }
    
    // REDIRECT - Existing route
    let allowedRoutes = [
      langfile.route_home[fixedLanguage],
      langfile.route_login[fixedLanguage],
      langfile.page_not_found[fixedLanguage]
    ];
    
    // 404 not found
    // todo - only checks split[1] now, what about subpaths
    if (!allowedRoutes.includes(queryUrl.split("/")[1])) {
      queryUrl = "/"+langfile.page_not_found[language];
    }
    
    // translate routes
    Object.values(langfile.route_login).forEach(route => queryUrl = queryUrl.replace(route,langfile.route_login[language]));

    return queryUrl;
  }
}
import { appPath } from '../redux/actions/static/appPath'
import {
  useLocation
} from "react-router-dom";
/**
 * dynamic routing uses routes defined under lang
 * routing accepts translationgs for each route and directs to correct page
 * when user changes path to /en /de /etc... on any route language changes
 * language used is stored in sessionstorage for next visit
 * sessionStorage keeps token on page refresh but clears it when tab is closed
 */
export function useDynamicRouting(queryUrl, langfile, language, store) {
  
  // React router dom useLocation
  let location = useLocation();

  // Parse language from path ending
  // in order to change SPA-language
  let newlang = location.pathname.split("/").slice(-1)[0];
  if (!!langfile[newlang]) {
    store.dispatch(appPath(newlang));
    language = newlang;
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
    
    // REDIRECT - Existing accepted routes,
    // developer add more when needed
    let allowedRoutes = [
      langfile.route_home["en"],
      langfile.route_login["en"],
      langfile.page_not_found["en"],
      langfile.route_dashboard["en"],
      langfile.route_home["de"],
      langfile.route_login["de"],
      langfile.page_not_found["de"],
      langfile.route_dashboard["de"]
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
import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/body.css';
import './style/css/animations.css';
import './style/css/containers/card.css';
import './style/css/containers/frame.css';
import './style/css/containers/table.css';
import './style/css/containers/list.css';

import { Provider } from "react-redux";
import store from "./redux/store/store"
import { appPath } from './redux/actions/routes/appPath'
//import Login from './samples/SampleCard';
//import Login from './samples/SampleFrame';
//import Login from './samples/SampleTableTestData';
//import Login from './samples/SampleListTestData';
import Login from './samples/SamplesTogether';
//import Login from './Login';
import Error from './Error';
import lang from './lang/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect
} from "react-router-dom";

let language;
let languagekey = sessionStorage.getItem('language');
if (!!languagekey) {
  language = languagekey;
} else {
  sessionStorage.setItem('language', 'de');
  language = "de";
}
let queryUrl;

function useDynamicRouting() {
  let location = useLocation();
  let newlang = location.pathname.split("/").slice(-1)[0];
  if (!!lang[newlang]) {
    store.dispatch(appPath(newlang));
    language = newlang;
    sessionStorage.setItem('language', language);
  }
  if (!window.history.state) {
    window.history.pushState({ prevUrl: location.pathname}, null, location.pathname)
  }
  if (!!location.search) {
    queryUrl = location.search.replace("?","");
    window.history.pushState({ prevUrl: location.pathname}, null, location.pathname)
    // REDIRECT - Language redirect
    let queryLang = location.search.split("/").slice(-1)[0];
    if (!!lang[queryLang]) {
      store.dispatch(appPath(queryLang));
      language = queryLang;
      sessionStorage.setItem('language', language);
    }
    // REDIRECT - Existing route or 404
    let allowedRoutes = [
      lang.route_home[language],
      lang.route_login[language],
      lang.page_not_found[language]
    ];
    if (allowedRoutes.includes(queryUrl.split("/")[1])) {
      console.log("REDIRECT");
      console.log(queryUrl.split("/")[1]);
    } else {
      console.log("REDIRECT 404");
      queryUrl = "/"+lang.page_not_found[language];
    }
    // translate routes
    Object.values(lang.route_login).forEach(route => queryUrl = queryUrl.replace(route,lang.route_login[language]));
  }
}

function App() {
  useDynamicRouting();
  return (        
    <Switch>
      <Route path={"/"+lang.route_login[language]}>
        <Login />
      </Route>
      <Route path={"/"+lang.page_not_found[language]}>
        <Error />
      </Route>
      <Route path={"/"}>
        {!!queryUrl ? <Redirect to={queryUrl} /> : <Redirect to={"/"+lang.route_login[language]} />}
      </Route>
    </Switch>
  );
}

const elem = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(elem, document.getElementById('root'));
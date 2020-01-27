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
import { appPath } from './redux/actions/appPath'
//import App from './App';
//import App from './samples/SampleCard';
//import App from './samples/SampleFrame';
//import App from './samples/SampleTableTestData';
//import App from './samples/SampleListTestData';
import Login from './Login';
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
  sessionStorage.setItem('language', 'en');
  language = "en";
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
    // REDIRECT
    let queryLang = location.search.split("/").slice(-1)[0];
    if (!!lang[queryLang]) {
      store.dispatch(appPath(queryLang));
      language = queryLang;
      sessionStorage.setItem('language', language);
    }
    console.log("REDIRECT");
    console.log(queryUrl);
    // translate routes
    Object.values(lang.route_login).forEach(route => queryUrl = queryUrl.replace(route,lang.route_login[language]));
    console.log(queryUrl);
  }
}

function App() {
  useDynamicRouting();
  return (        
    <Switch>
      <Route path={"/"+lang.route_login[language]}>
        <Login />
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
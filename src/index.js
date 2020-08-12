import React from 'react';
import ReactDOM from 'react-dom';
import './style/css/body.css';
import './style/css/animations.css';
import './style/css/containers/card.css';
import './style/css/containers/frame.css';
import './style/css/containers/table.css';
import './style/css/containers/list.css';
import './style/css/containers/chart.css';
import './style/css/icons/icons_table.css';

import storedLanguage from "./lang/functions/storedLanguage"
import tokenstore from './redux/store/tokenstore';
import { sessionRestore } from './storage/sessionStorage';


import { Provider } from "react-redux";
import store from "./redux/store/store"
import { useDynamicRouting } from './proxy/dynamicRouting'

//import Login from './Login';
import Login from './samples/DeveloperPage';

import Dashboard from './Dashboard';
import Error from './Error';
import lang from './lang/index'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// LANGUAGE
let language;
language = storedLanguage();

let queryUrl;

const elem = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

function App() {
  sessionRestore();
  queryUrl = useDynamicRouting(queryUrl, lang, language, store);
  const login = lang.route_login[language];
  const dashboard = lang.route_dashboard[language];
  const pagenotfound = lang.page_not_found[language];
  return (        
    <Switch>

      <Route path={"/" + login}>
        {!!tokenstore.getState() ? <Redirect to={dashboard} /> : <Login />}
      </Route>

      <Route path={"/" + dashboard}>
        {!!tokenstore.getState() ? <Dashboard /> : <Redirect to={login} />}
      </Route>

      <Route path={"/" + pagenotfound}>
        <Error />
      </Route>

      <Route path={"/"}>
        {!!queryUrl ? <Redirect to={queryUrl} /> : 
        <Redirect to={!tokenstore.getState() ? "/" + login : "/" + dashboard} />}
      </Route>

    </Switch>
  );
}

ReactDOM.render(elem, document.getElementById('root'));
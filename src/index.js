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
//import App from './App';
//import App from './samples/SampleCard';
//import App from './samples/SampleFrame';
import App from './samples/SampleTableTestData';
//import App from './samples/SampleListTestData';

const elem = (
  <Provider store={store}>
      <App />
  </Provider>
);

ReactDOM.render(elem, document.getElementById('root'));
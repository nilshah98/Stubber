/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from 'react-redux'

// core components
import App from './app'

import languageReducer from './reducers/languageReducer'
import userTypeReducer from './reducers/userTypeReducer'
// import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0"

const reducer = combineReducers({
  language: languageReducer,
  userType: userTypeReducer
})

const store = createStore(reducer)

console.log(store.getState())

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

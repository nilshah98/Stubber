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
import { Provider } from 'react-redux'

import './i18n'
// core components
import App from './app'
import store from './store'
// import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0"

ReactDOM.render(
  <Provider store = {store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

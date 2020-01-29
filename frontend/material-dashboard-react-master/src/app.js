import React from 'react'
import { createBrowserHistory } from "history";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Login from "layouts/Login"

const hist = createBrowserHistory();

const App = () => {
	const userLogged = window.localStorage.getItem('stubber')

	// console.log( JSON.parse(userLogged) )
	let userType = 'consumer'
	if( userLogged ) {
		userType = (JSON.parse(userLogged)).usertype
	}
	// console.log(userType)
	return (
		<Router history={hist}>
			<Switch>
				<Route path="/farmer" component={Admin} />
				<Route path="/consumer" component={Admin} />
				{/* <Route path="/rtl" component={RTL} /> */}
				<Route path = "/login" component={Login} />
				{ userLogged && true ? <Redirect from="/" to={`/${userType}/dashboard`} /> : <Redirect from = "/" to = "/login" /> }
			</Switch>
		</Router>
	)
}

export default App
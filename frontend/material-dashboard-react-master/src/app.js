import React from 'react'
import { createBrowserHistory } from "history";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.js";
import Login from "layouts/Login";
import Register from "layouts/Register";

const hist = createBrowserHistory();

const App = () => {
	const userLogged = window.localStorage.getItem('stubber')

	console.log( userLogged )
	return (
		<Router history={hist}>
			<Switch>
				<Route path="/farmer" component={Admin} />
				{/* <Route path="/rtl" component={RTL} /> */}
				<Route path = "/login" component={Login} />
				<Route path = "/register" component={Register} />
				{ userLogged && true ? <Redirect from="/" to="/farmer/dashboard" /> : <Redirect from = "/" to = "/login" /> }
			</Switch>
		</Router>
	)
}

export default App
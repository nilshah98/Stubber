import React, { Suspense, useEffect } from 'react'
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { useTranslation } from 'react-i18next'

import ProtectedRoute from "./components/ProtectedRouter";
import Admin from "layouts/Admin.js";
import Login from "layouts/Login";
import Register from "layouts/Register";

const hist = createBrowserHistory();

const MyComponent = () => {
	const { t, i18n } = useTranslation()

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng)
	}

	return (
		<>
			<h1> { t('title') } </h1>
			<button onClick = { () => changeLanguage('en') } > en </button>
			<button onClick = { () => changeLanguage('hi') } > hi </button>
		</>
	)
}

const App = () => {
	const userLogged = window.localStorage.getItem('stubber')

	// console.log( JSON.parse(userLogged) )
	let userType = 'consumer'
	if( userLogged ) {
		userType = (JSON.parse(userLogged)).usertype
	}
	// console.log(userType)
	return (
		// <>
		// 	<Suspense fallback = "location" >
		// 		<MyComponent />
		// 	</Suspense>
			<Router history={hist}>
				<Switch>
					<ProtectedRoute path="/farmer" component={Admin} />
					<ProtectedRoute path="/consumer" component={Admin} />
					<Route path = "/login" component={Login} />
					<Route path = "/register" component={Register} />
					{ userLogged && true ? <Redirect from="/" to={`/${userType}/dashboard`} /> : <Redirect from = "/" to = "/login" /> }
				</Switch>
			</Router>
		// {/* </> */}
	)
}

export default App
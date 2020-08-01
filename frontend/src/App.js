import React from 'react'

import {
	BrowserRouter as Router,
	Switch, Route, Link, Redirect
} from "react-router-dom"

import { useTranslation } from 'react-i18next'

import FDashboard from './components/FDashboard'
import CDashboard from './components/CDashboard'
import { Container } from 'semantic-ui-react'

const App = () => {
	const { t, i18n } = useTranslation()
	const changeLanguage = code => {
		i18n.changeLanguage(code)
	}

	const padding = {
		padding: 5
	}

	const imgStyle = {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundImage: 'url('+'https://www.commondreams.org/sites/default/files/styles/cd_large/public/views-article/farms.jpeg?itok=cTmtRuzF'+')'
	}

	return (
		<div className="App" style={imgStyle}>
			<Router>
			<div>
				<Link style={padding} to="/">home</Link>
				<Link style={padding} to="/farmer">Farmer</Link>
				<Link style={padding} to="/consumer">Consumer</Link>
			</div>

				<Switch>
					<Route path="/farmer">
						<Container>
							<FDashboard />
						</Container>
					</Route>
					<Route path="/consumer">
						<CDashboard />
					</Route>
					<Route path="/">
						<Redirect to = "/farmer" />
					</Route>
				</Switch>
			</Router>
			<h3> {t('welcome')} </h3>

			<button type="button" onClick={() => changeLanguage('hi')}>
				{t('translation:hi')}
			</button>
		</div>
	)
}

export default App

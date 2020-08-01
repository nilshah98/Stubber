import React, { useState } from 'react'

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom"

import { useTranslation } from "react-i18next"

import SignUp from './components/SignUp'
import FDashboard from "./components/FDashboard"
import CDashboard from "./components/CDashboard"
import Footer from "./components/Footer"

import {
	Container,
	Menu,
	Segment,
	Button,
} from 'semantic-ui-react'

const App = () => {
	const { t, i18n } = useTranslation()
	const changeLanguage = code => {
		i18n.changeLanguage(code)
	}

	const [toEnglish, setToEnglish] = useState(true)

	const translate = () => {
		toEnglish === true ? changeLanguage('hi') : changeLanguage('en')
		setToEnglish(!toEnglish)
	}

	const imgStyle = {
		backgroundSize: 'cover',
		backgroundImage:'url('+'https://images.unsplash.com/photo-1554973653-c9071bd14011?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=961&q=80'+')'
	}

	return (
		<div className="App" style={imgStyle}>
			<Router>
				<Segment
					inverted
					textAlign='center'
					vertical
				>
					<Menu size='large' inverted>
						<Container textAlign='center'>
							<Menu.Item as='h2' inverted="true">
								Stubber
							</Menu.Item>
							<Menu.Item as='p'>
								<Link to="/farmer">{t('Farmer')}</Link>
							</Menu.Item>
							<Menu.Item as='p'>
								<Link to="/consumer">{t('Consumer')}</Link>
							</Menu.Item>
							<Menu.Item as='p'>
								<Link to="/signup">{t('Signup')}</Link>
							</Menu.Item>
							<Menu.Item position='right'>
								<Button as='a' onClick={() => translate()}>
									{toEnglish === true ? 'हि' : 'EN'}
								</Button>
							</Menu.Item>
						</Container>
					</Menu>
				</Segment>
				<Switch>
					<Route path="/farmer">
						<FDashboard />
					</Route>
					<Route path="/consumer">
						<CDashboard />
					</Route>
					<Route path="/signup">
						<SignUp />
					</Route>
					<Route path="/">
						<Redirect to="/farmer" />
					</Route>
				</Switch>
			</Router>

			<Footer />
		</div>
	)
}

export default App

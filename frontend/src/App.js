import React from 'react'
import logo from './logo.svg'

import { useTranslation } from 'react-i18next'

const App = () => {
	const { t, i18n } = useTranslation()
	const changeLanguage = code => {
		i18n.changeLanguage(code)
	}

	return (
		<div className="App">
			<h3> {t('welcome')} </h3>

			<button type="button" onClick={() => changeLanguage('hi')}>
				{t('translation:hi')}
			</button>
		</div>
	)
}

export default App

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './i18n'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
	<Suspense fallback = { null } >
		<App />
	</Suspense>,
	document.getElementById('root')
)
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './i18n'
import 'semantic-ui-css/semantic.min.css'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
	<Suspense fallback = { null } >
		<App />
	</Suspense>,
	document.getElementById('root')
)
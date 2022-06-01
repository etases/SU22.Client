// libs
import React from 'react'
import ReactDOM from 'react-dom/client'

// translations
import '~/core/configurations/i18next'

// components
import { NormalLayout as Layout } from '~/core/components'

// css
import '~/core/styles/index.scss'

// Windi CSS
import 'virtual:windi.css'
import 'virtual:windi-devtools'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Layout />
	</React.StrictMode>
)

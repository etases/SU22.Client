// libs
import React from 'react'
import ReactDOM from 'react-dom/client'

// translations
import '~/core/configurations/i18next'

// components
import {
	GlobalStateProvider,
	NotificationProvider,
	QueryProvider,
	SpotlightProvider,
	ThemeProvider,
} from '~/core/configurations'
import { Router } from '~/router'

// css
import '~/core/styles/index.scss'

// Windi CSS
import 'virtual:windi-devtools'
import 'virtual:windi.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GlobalStateProvider>
			<QueryProvider>
				<ThemeProvider>
					<SpotlightProvider>
						<NotificationProvider>
							<Router />
						</NotificationProvider>
					</SpotlightProvider>
				</ThemeProvider>
			</QueryProvider>
		</GlobalStateProvider>
	</React.StrictMode>
)

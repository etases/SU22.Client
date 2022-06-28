import { useRoutes, BrowserRouter } from 'react-router-dom'
import { routes } from '~/core/configurations'

export function Router() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	)
}

function Routes() {
	const appRoutes = useRoutes(routes)
	return appRoutes
}

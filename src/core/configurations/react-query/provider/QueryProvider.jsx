import { QueryClientProvider } from 'react-query'
import { queryClient, QueryDevTools } from '~/core/configurations'

export function QueryProvider(props) {
	const { children, ...rest } = props

	return (
		<QueryClientProvider
			{...rest}
			client={queryClient}>
			<QueryDevTools />
			{children}
		</QueryClientProvider>
	)
}

export default QueryProvider

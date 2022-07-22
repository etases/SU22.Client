import PropTypes from 'prop-types'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '~/core/configurations'

export function QueryProvider(props) {
	const { children, ...rest } = props

	return (
		<QueryClientProvider
			{...rest}
			client={queryClient}>
			{/* <QueryDevTools /> */}
			{children}
		</QueryClientProvider>
	)
}

export default QueryProvider

QueryProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

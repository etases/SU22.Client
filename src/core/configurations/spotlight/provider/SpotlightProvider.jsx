import { SpotlightProvider as Provider } from '@mantine/spotlight'
import PropTypes from 'prop-types'

export function SpotlightProvider(props) {
	const { children, ...rest } = props
	return (
		<Provider
			actions={[]}
			{...rest}>
			{children}
		</Provider>
	)
}
SpotlightProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

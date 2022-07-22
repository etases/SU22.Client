import { SpotlightProvider as Provider } from '@mantine/spotlight'
import PropTypes from 'prop-types'
import { useGlobalState } from '~/hooks'

export function SpotlightProvider(props) {
	const { children, ...rest } = props
	const [account] = useGlobalState({ store: 'account' })
	const ACTIONS = [
		{
			title: 'Manage Account',
			description: "Manage user's account",
			onTrigger: () => {
				window.location.href = '/Manage'
			},
		},
	]

	return (
		<Provider
			actions={account?.info?.role?.id === 1 ? ACTIONS : []}
			{...rest}>
			{children}
		</Provider>
	)
}
SpotlightProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

import { NotificationsProvider as Provider } from '@mantine/notifications'
import PropTypes from 'prop-types'

export function NotificationProvider(props) {
	const { children, ...rest } = props
	return <Provider {...rest}>{children}</Provider>
}

NotificationProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

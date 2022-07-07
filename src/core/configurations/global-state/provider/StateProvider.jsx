import { Provider } from 'jotai'
import PropTypes from 'prop-types'
import { GlobalStateDevTools } from '~/core/configurations'

export function GlobalStateProvider(props) {
  const { children, ...rest } = props
  return (
    <Provider {...rest}>
      <GlobalStateDevTools />
      {children}
    </Provider>
  )
}

export default GlobalStateProvider

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

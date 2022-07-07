import { MantineProvider } from '@mantine/core'
import PropTypes from 'prop-types'

export function ThemeProvider(props) {
  const { children, ...rest } = props
  return (
    <MantineProvider
      theme={{
        colors: {},
        colorScheme: 'light',
        fontFamily: 'sans-serif',
        fontSizes: {},
        headings: {
          fontFamily: 'initial',
          sizes: {},
        },
        radius: {},
      }}
      withNormalizeCSS
      withGlobalStyles
      withCSSVariables
      {...rest}>
      {children}
    </MantineProvider>
  )
}
export default ThemeProvider

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

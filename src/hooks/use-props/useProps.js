import { useMemo } from 'react'

const initialParams = {
	defaultProps: {},
	props: {},
}

export function useProps(params = initialParams) {
	const mergedProps = useMemo(() => mergeProps(params), [params])
	return mergedProps
}

export default useProps

// merge props object and default props objects recursively (default props are used if props is not defined)
function mergeProps(params = initialParams) {
	const { defaultProps, props } = params

	if (!props) return defaultProps
	if (!defaultProps) return props

	try {
		const result = Object.keys(defaultProps).reduce((mergedProps, key) => {
			if (props[key]) {
				mergedProps[key] = mergeProps(props[key], defaultProps[key])
			} else {
				mergedProps[key] = defaultProps[key]
			}
			return mergedProps
		}, {})
		return result
	} catch (err) {
		return { ...defaultProps, error: err }
	}
}

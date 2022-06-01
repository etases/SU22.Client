import { translation as en } from './en'
import { translation as vi } from './vi'

const resources = {
	en,
	vi,
}

export const mergedResources = Object.keys(resources).reduce((acc, key) => {
	const { [key]: translation } = resources
	return {
		...acc,
		[key]: { translation },
	}
}, {})

export default mergedResources

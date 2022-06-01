import { useEffect } from 'react'
import { useProps, useTranslation } from '~/hooks'
const initialParams = {
	resources: {},
}

export function useTranslations(params = initialParams) {
	const { resources } = useProps({
		props: params,
		initialProps: initialParams,
	})

	// functions
	const translate = useTranslation({
		getTranslatorOnly: true,
	})

	// state
	const [translations, setTranslations] = useState(resources)

	useEffect(() => {
		const translatedResources = {}
		Object.keys(resources).forEach((key) => {
			try {
				translatedResources[key] = translate({
					key: resources[key].translationKey,
					defaultValue: resources[key].defaultValue,
				})
			} catch (err) {
				translatedResources[key] = resources[key].defaultValue
			}
		})
		setTranslations(translatedResources)
	}, [resources])

	return translations
}

export default useTranslations

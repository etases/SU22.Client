import { useEffect, useState } from 'react'
import { useTranslation as useI18nTranslation } from 'react-i18next'

import { useProps } from '~/hooks'

const initialProps = {
	nameSpace: 'en',
	translationKey: '',
	keyParams: {},
	defaultValue: '',
	getTranslatorOnly: false,
}

export function useTranslation(props = initialProps) {
	// use params
	const {
		nameSpace,
		translationKey,
		keyParams,
		defaultValue,
		getTranslatorOnly,
	} = useProps({
		props,
		initialProps,
	})

	// use hooks
	const { t: translate } = useI18nTranslation()

	function translator({ key, defaultValue, keyParams }) {
		if (typeof key !== 'string') return key
		return translate(key, {
			ns: nameSpace,
			defaultValue,
			...keyParams,
		})
	}

	// state
	const [value, setValue] = useState({ value: defaultValue, error: null })

	// effect
	useEffect(() => {
		try {
			const translatedValue = translator({
				key: translationKey,
				defaultValue,
				keyParams,
			})
			setValue((prev) => ({ ...prev, value: translatedValue }))
		} catch (error) {
			setValue((prev) => ({ ...prev, error }))
		}
	}, [nameSpace, translationKey, defaultValue, getTranslatorOnly])

	return getTranslatorOnly ? translator : value
}

export default useTranslation

import { useEffect, useState } from 'react'
import { useTranslation as useI18nTranslation } from 'react-i18next'

import { useGlobalState, useProps } from '~/hooks'

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

	const [languageStore] = useGlobalState({
		store: 'language',
	})

	// use hooks
	const { t: translate } = useI18nTranslation()

	function translator({ key, defaultValue, keyParams }) {
		if (typeof key !== 'string') return key
		return translate(key, {
			nameSpace,
			defaultValue,
			lng: languageStore.currentLanguage,
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

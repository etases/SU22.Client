// libs
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// resources
import resources from '~/core/translations'

export const i18n = i18next.use(initReactI18next).init({
	resources,
	lng: 'en',
	interpolation: {
		prefix: '{',
		suffix: '}',
	},
})

export default i18n

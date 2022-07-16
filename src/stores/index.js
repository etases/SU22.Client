import { accountStore } from './accountStore'
import { languageStore } from './languageStore'
import { themeStore } from './themeStore'
export const mergedStore = {
	theme: themeStore,
	account: accountStore,
	language: languageStore,
}

export default mergedStore

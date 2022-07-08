import { accountStore } from './accountStore'
import { themeStore } from './themeStore'
export const mergedStore = {
    theme: themeStore,
    account: accountStore,
}

export default mergedStore

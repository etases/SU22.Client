import { atom } from 'jotai'

export const accountStore = atom({
    token: null,
    info: null,
})

export default accountStore

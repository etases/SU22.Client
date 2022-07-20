import { atom } from 'jotai'

export const accountStore = atom({
	token: localStorage.getItem('token') || null,
	info: null,
})

export default accountStore

import { atom } from 'jotai'

export const accountStore = atom({
	token: localStorage.getItem('token') || null,
	info: JSON.parse(localStorage.getItem('account')) || null,
})

export default accountStore

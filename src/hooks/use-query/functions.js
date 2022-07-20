import { Body, fetch as tauriFetch } from '@tauri-apps/api/http'

const isTauri = window.__TAURI__

const fetcher = isTauri ? tauriFetch : fetch

export async function fetchApi(params) {
	const { baseUrl, endpoint, method, query, body, contentType } = params
	const url =
		(baseUrl?.protocol || 'http://') +
		(baseUrl?.host || 'localhost') +
		(baseUrl?.port || ':5131') +
		endpoint +
		toQueryString(query || {})
	const accountToken = localStorage.getItem('token')
	const response = await fetcher(url, {
		method: method || 'GET',
		headers: {
			...(accountToken
				? { Authorization: `Bearer ${accountToken}` }
				: {}),
			'Content-Type': contentType || 'application/json',
		},
		credentials: 'include',
		...(body
			? { body: isTauri ? Body.json(body) : JSON.stringify(body) }
			: {}),
	})

	// if token expired, go to login
	if (response.status === 401) {
		window.location.href = '/sign-in'
		localStorage.removeItem('token')
		return
	}

	if (!response.ok) {
		throw new Error(response.statusText)
	}

	// console.log(isTauri ? response.data : response.json())
	return isTauri ? response.data : response.json()
}

function toQueryString(query) {
	const queryString =
		Object.keys(query)
			.map((key) => `${key}=${query[key]}`)
			.join('&') || ''
	return queryString.length > 0 ? '?' + queryString : queryString
}

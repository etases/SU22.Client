export async function fetchApi(params) {
    const { baseUrl, endpoint, method, query, body } = params
    const url =
        (baseUrl?.protocol || '') +
        (baseUrl?.host || '') +
        (baseUrl?.port || '') +
        endpoint +
        toQueryString(query || {})

    const accountToken = localStorage.getItem('token')

    const response = await fetch(url, {
        method: method || 'GET',
        headers: {
            Authorization: `Bearer ${
                typeof accountToken === 'string' ? accountToken : ''
            }`,
        },
        credentials: 'include',
        ...(body ? { body: JSON.stringify(body) } : {}),
    })

    // if token expired, go to login
    if (response.status === 401) {
        localStorage.clear()
        window.location.href = '/login'
        return
    }

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json()
}

function toQueryString(query) {
    return (
        Object.keys(query)
            .map((key) => `${key}=${query[key]}`)
            .join('&') || ''
    )
}

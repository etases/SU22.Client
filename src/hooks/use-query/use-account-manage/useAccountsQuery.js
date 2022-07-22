import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchApi } from '../functions'

export function useAccountsQuery() {
	const [query, setQuery] = useState({
		pageNumber: 1,
		pageSize: 5,
		checkBanned: false,
		checkDisabled: false,
	})
	const result = useQuery({
		queryKey: ['accounts', query],
		queryFn: async () =>
			fetchApi({
				endpoint: '/account/all',
				query,
			}),
		select: ({
			data: accountList,
			errorCode,
			message,
			success,
			...rest
		}) => ({
			metadata: { errorCode, message, success },
			pagination: rest,
			accounts: accountList,
		}),
		onSuccess: (data) => {},
	})
	return { queryResult: result, query: { query, setQuery } }
}

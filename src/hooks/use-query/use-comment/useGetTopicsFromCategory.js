import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function useGetTopicsFromCategory(props) {
	const [query, setQuery] = useState({
		categoryId: props.categoryId,
		pageSize: 5,
		pageNumber: 1,
		keyword: props.keyword,
	})
	const result = useQuery({
		queryKey: [
			'getTopicsFromCategory',
			{ categoryId: query.categoryId, pageNumber: query.pageNumber },
		],
		queryFn: async () =>
			fetchApi({
				method: 'GET',
				endpoint: '/comment/filtered',
				query: {
					categoryId: query.categoryId,
					keyword: query.keyword,
					pageNumber: query.pageNumber,
					pageSize: query.pageSize,
				},
			}),
		onSuccess: (data) => {},
	})

	return { topicsResult: result, query: { query, setQuery } }
}

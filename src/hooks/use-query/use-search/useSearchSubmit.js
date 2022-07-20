import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { fetchApi } from '../functions'

export function useSearchSubmit(props) {
	const { categoryId, keyword } = props
	const [page, setPage] = useState(parseInt(props?.page) || 1)
	const navigate = useNavigate()
	const { refetch, ...restProps } = useQuery({
		enabled: false,
		queryKey: [
			'search',
			{ keyword: keyword.join(','), categoryId, page: page },
		],
		queryFn: async ({ queryKey: [_, query] }) => {
			return fetchApi({
				endpoint: '/comment/filtered',
				query: {
					categoryId: query.categoryId,
					keyword: query.keyword,
					pageSize: 100,
				},
			})
		},
		select: (data) => {
			return data
		},
		onSuccess: (response) => {
			const firstComment = response.data?.[0]
			// console.log(response)
			navigate(firstComment.category.name, {
				state: {
					commentId: firstComment.id,
					categoryId: firstComment.category.id,
					keyword,
					currentPage: response.pageNumber,
					totalPage: response.totalPage,
					totalRecord: response.totalRecord,
					topics: response.data,
				},
			})
		},
	})
	function fetchData(data) {
		refetch({
			queryKey: [
				'search',
				{ keyword: data.keyword, categoryId: data.categoryId },
			],
		})
	}
	return { ...restProps, fetchData, setPage }
}

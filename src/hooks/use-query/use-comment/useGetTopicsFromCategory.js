import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function useGetTopicsFromCategory(props) {
	const { categoryId, page } = props;
	return useQuery({
		queryKey: ['getTopicsFromCategory', { categoryId, page }],
		queryFn: async () =>
			fetchApi({
				method: 'GET',
				endpoint: 'https://localhost:3000/comment/gettopicsfromcategory',
				query: {
					id: categoryId,
					pageNumber: page,
					pageSize: 10
				},
			}),
		onSuccess: (data) => {
			console.log('success', data)
		},
	});
}
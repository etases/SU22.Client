import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function useGetCommentsFromParent(props) {
	const { id } = props
	return useQuery({
		queryKey: ['getCommentsFromParent', id],
		queryFn: async () =>
			fetchApi({
				method: 'GET',
				baseUrl: {
					protocol: 'https://',
					host: 'localhost',
					port: ':3000',
				},
				endpoint: '/comment/getcommentsfromparent',
				query: {
					id,
				},
			}),
		onSuccess: (data) => {},
	})
}

import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function useGetCommentsFromParent(props) {
	const { id } = props
	return useQuery({
		queryKey: ['getCommentsFromParent', id],
		queryFn: async () =>
			fetchApi({
				method: 'GET',
				endpoint:
					'https://localhost:3000/comment/getcommentsfromparent',
				query: {
					id,
				},
			}),
		onSuccess: (data) => {},
	})
}

import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function useGetComment(props) {
	const { id } = props;
	return useQuery({
		queryKey: ['getComment', id],
		queryFn: async () =>
			fetchApi({
				method: 'GET',
				endpoint: 'https://localhost:3000/comment/getcomment',
				query: {
					id: id
				},
			}),
		onSuccess: (data) => {
			console.log('success', data)
		},
	});
}
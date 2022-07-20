import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function useGetComment(props) {
	const { id } = props
	return useQuery({
		queryKey: ['getComment', id],
		queryFn: async ({ queryKey }) =>
			fetchApi({
				endpoint: '/comment/' + queryKey[1],
			}),
		onSuccess: (data) => {
			console.log('useGetComment', data)
		},
	})
}

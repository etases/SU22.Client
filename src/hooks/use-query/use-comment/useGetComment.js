import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function useGetComment(props) {
	const { id } = props
	const result = useQuery({
		queryKey: ['getComment', id],
		queryFn: async ({ queryKey }) =>
			fetchApi({
				endpoint: '/comment/' + queryKey[1],
			}),
		onSuccess: (data) => {},
		refetchInterval: 5000,
	})
	return result
}

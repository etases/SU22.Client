import { useMutation, useQuery } from 'react-query'
import { fetchApi } from '../functions'
import { useQueryClient } from '../useQueryClient'

export function useCommentVote(props) {
	const { id } = props
	const queryClient = useQueryClient()
	const voteResult = useQuery({
		enabled: !!id,
		queryKey: ['comment', 'vote', id],
		queryFn: async () =>
			fetchApi({
				endpoint: `/vote/count/${id}`,
			}),
		select: (data) => data.data.toString(),
		refetchInterval: 5000,
	})

	const voteStatus = useQuery({
		enabled: !!id,
		queryKey: ['comment', 'vote', id, 'status'],
		queryFn: async () =>
			fetchApi({
				endpoint: `/vote/${id}`,
			}),
		select: (data) => data.data,
	})

	const voteMutate = useMutation({
		mutationKey: ['commentAction', 'vote', id],
		mutationFn: async () =>
			fetchApi({
				endpoint: `/vote`,
				method: 'POST',
				body: {
					commentId: parseInt(id),
					isUpvote: true,
				},
			}),
		onSuccess: () => {
			queryClient.invalidateQueries(['comment', 'vote'])
		},
	})

	return { voteResult, voteMutate, voteStatus }
}

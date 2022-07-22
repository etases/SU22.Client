import { showNotification } from '@mantine/notifications'
import { useMutation } from 'react-query'
import { fetchApi } from '../functions'
import { useQueryClient } from '../useQueryClient'

export function useAccountStatus() {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationKey: ['accountStatus'],
		mutationFn: async ({ accountId, isBanned }) =>
			fetchApi({
				method: 'PUT',
				endpoint: `/account/ban/${accountId}`,
				query: {
					ban: !isBanned,
				},
			}),
		onSuccess: (data, { isBanned }) => {
			queryClient.invalidateQueries(['accounts'])
			showNotification({
				message: `Account ${
					data.account.username
				} status is ${!isBanned}`,
			})
		},
	})
	return mutation
}

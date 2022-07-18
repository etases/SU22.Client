import { useMutation, useQueryClient } from 'react-query'
import { fetchApi } from '../functions'

export function useSignUpSubmit() {
	const queryClient = useQueryClient()
	const { ...restProps } = useMutation({
		mutationKey: 'sign-up',
		mutationFn: async (values) =>
			fetchApi({
				method: 'POST',
				endpoint: 'account/register',
				body: values,
			}),
		onSuccess: (response) => {},
		onError: (error) => {},
	})
	return { ...restProps }
}

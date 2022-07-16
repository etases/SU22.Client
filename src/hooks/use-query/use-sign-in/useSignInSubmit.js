import { useMutation, useQueryClient } from 'react-query'
import { fetchApi } from '../functions'

export function useSignInSubmit() {
	const queryClient = useQueryClient()
	const { ...restProps } = useMutation({
		mutationKey: 'sign-in',
		mutationFn: async (values) =>
			fetchApi({
				method: 'POST',
				endpoint: 'account/login',
				body: values,
			}),
		onSuccess: (response) => {
			const {
				data: { token },
			} = response
			localStorage.setItem('token', token)
		},
	})
	return { ...restProps }
}

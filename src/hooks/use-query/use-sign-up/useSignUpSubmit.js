import { showNotification } from '@mantine/notifications'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { fetchApi } from '../functions'

export function useSignUpSubmit() {
	const navigate = useNavigate()
	// const queryClient = useQueryClient()
	const { ...restProps } = useMutation({
		mutationKey: 'sign-up',
		mutationFn: async (values) => {
			const truncatedValues = values
			delete truncatedValues.passwordConfirmation
			return fetchApi({
				method: 'POST',
				endpoint: '/account/register',
				body: truncatedValues,
			})
		},
		onSuccess: (response) => {
			navigate('/sign-in')
		},
		onError: (error) => {
			console.log('SignUp', error)
			showNotification({
				message: error.message,
			})
		},
	})
	return { ...restProps }
}

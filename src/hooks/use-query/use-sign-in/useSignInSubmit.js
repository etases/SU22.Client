import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from '~/hooks/use-global-state'
import { fetchApi } from '../functions'

export function useSignInSubmit() {
	const [, setAccount] = useGlobalState({
		store: 'account',
	})
	const navigate = useNavigate()
	const { ...restProps } = useMutation({
		mutationKey: 'sign-in',
		mutationFn: async (values) =>
			fetchApi({
				method: 'POST',
				endpoint: '/account/login',
				body: values,
			}),
		onSuccess: (response) => {
			const { data: token } = response
			setAccount((prev) => ({ ...prev, token }))
			localStorage.setItem('token', token)
			navigate('/')
		},
	})
	return { ...restProps }
}

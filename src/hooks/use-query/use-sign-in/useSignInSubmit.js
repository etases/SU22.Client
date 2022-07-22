import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from '~/hooks/use-global-state'
import { fetchApi } from '../functions'

export function useSignInSubmit() {
	const [account, setAccount] = useGlobalState({
		store: 'account',
	})

	const accountQuery = useQuery({
		enabled: false,
		queryKey: ['account', account.token],
		queryFn: async () =>
			fetchApi({
				endpoint: '/account/fromtoken',
			}),
		onSuccess: (data) => {},
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
			localStorage.setItem('token', token)
			setAccount((prev) => ({ ...prev, token }))
			accountQuery.refetch().then((response) => {
				const {
					data: { data },
				} = response
				setAccount((prev) => ({ ...prev, info: data }))
				localStorage.setItem('account', JSON.stringify(data))
			})
			navigate('/')
		},
	})
	return { ...restProps }
}

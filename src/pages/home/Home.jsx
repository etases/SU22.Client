import { Grid, Title } from '@mantine/core'
import { useQuery } from 'react-query'
import { fetchApi } from '~/hooks'

export function Home() {
	const { data, isLoading, fetchStatus } = useQuery(['home'], {
		queryFn: async () =>
			fetchApi({
				endpoint: 'metadata/settings',
			}),
		onSuccess: (data) => {},
	})

	return (
		<Grid>
			<Title order={1}>Home</Title>
			<Title order={1}>
				{isLoading ? 'Loading...' : data.request?.originalUrl}
			</Title>
		</Grid>
	)
}

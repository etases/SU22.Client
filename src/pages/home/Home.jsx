import { Center, SimpleGrid } from '@mantine/core'
import CategoryList from '~/components/HomeComponents/CategoryList'
import SearchBar from '~/components/HomeComponents/SearchBar'

export function Home() {
<<<<<<< HEAD
  return (
    <Center>
      <SimpleGrid cols={1}>
        <SearchBar />
        <CategoryList />
      </SimpleGrid>
    </Center>
  )
=======
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
>>>>>>> main
}

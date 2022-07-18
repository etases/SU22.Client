import { Center, SimpleGrid } from '@mantine/core'
import CategoryList from '~/components/HomeComponents/CategoryList'
import SearchBar from '~/components/HomeComponents/SearchBar'

export function Home() {
	return (
		<Center>
			<SimpleGrid cols={1}>
				<SearchBar />
				<CategoryList />
			</SimpleGrid>
		</Center>
	)
}

import { useQueries } from 'react-query'
import { fetchApi } from '../functions'
import { useSearch } from '../use-search'

export function useHome() {
	const {
		categoryQuery: { data: categoriesData },
	} = useSearch()

	const homeResult = useQueries({
		queries:
			categoriesData?.map((categories) => ({
				queryKey: ['home', 'categories', categories.value],
				queryFn: async ({ queryKey }) =>
					fetchApi({
						endpoint: '/comment/filtered',
						query: {
							...(queryKey[2]
								? { categoryId: queryKey[2], pageSize: 5 }
								: {}),
						},
					}),
				select: (data) => {
					const { data: categoryTopics } = data
					const category = categoryTopics[0]?.category
					const result = { topics: categoryTopics, category }
					return result
				},
				onSuccess: (data) => {},
			})) || [],
	})

	return homeResult
}

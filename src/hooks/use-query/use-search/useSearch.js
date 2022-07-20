import { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchApi } from '../functions'

export function useSearch() {
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [selectedKeyword, setSelectedKeyword] = useState([])

	const categoryQuery = useQuery({
		queryKey: ['category', 'list'],
		queryFn: async () =>
			fetchApi({
				endpoint: '/category',
			}),
		select: (data) => {
			const { data: categories } = data
			return categories.map((item) => ({
				value: item?.id.toString(),
				label: item.name,
			}))
		},
		onSuccess: (categories) => {
			setSelectedCategory((prev) => (prev !== null ? prev : null))
		},
	})

	const keywordQuery = useQuery({
		enabled: selectedCategory !== null,
		queryKey: [selectedCategory, 'keyword'],
		queryFn: async () =>
			fetchApi({
				endpoint: '/comment/keyword',
				query: {
					categoryId: selectedCategory,
				},
			}),
		select: (data) => {
			const { data: keywords } = data
			return keywords.map((item) => ({
				value: item,
				label: item,
			}))
		},
		onSuccess: (keywords) => {
			setSelectedKeyword((prev) =>
				keywords.length > 0
					? prev.filter((keyword) => !keywords.includes(keyword))
					: []
			)
		},
	})

	return {
		categoryQuery,
		keywordQuery,
		state: {
			category: { selectedCategory, setSelectedCategory },
			keyword: { selectedKeyword, setSelectedKeyword },
		},
	}
}

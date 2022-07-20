import { Button, Grid, MultiSelect, Select } from '@mantine/core'
import { useHome, useSearch, useSearchForm, useSearchSubmit } from '~/hooks'
import { useQueryClient } from '~/hooks/use-query/useQueryClient'
import { CategoryCard } from './CategoryCard'

const { Col } = Grid

const COLORS = [
	{ background: '#f44336', foreground: '#fff' },
	{ background: '#e91e63', foreground: '#fff' },
	{ background: '#9c27b0', foreground: '#fff' },
	{ background: '#673ab7', foreground: '#fff' },
	{ background: '#3f51b5', foreground: '#fff' },
	{ background: '#2196f3', foreground: '#fff' },
	{ background: '#03a9f4', foreground: '#fff' },
	{ background: '#00bcd4', foreground: '#fff' },
	{ background: '#009688', foreground: '#fff' },
	{ background: '#4caf50', foreground: '#fff' },
	{ background: '#8bc34a', foreground: '#fff' },
	{ background: '#cddc39', foreground: '#fff' },
	{ background: '#ffeb3b', foreground: '#fff' },
	{ background: '#ffc107', foreground: '#fff' },
	{ background: '#ff9800', foreground: '#fff' },
	{ background: '#ff5722', foreground: '#fff' },
	{ background: '#795548', foreground: '#fff' },
	{ background: '#9e9e9e', foreground: '#fff' },
	{ background: '#607d8b', foreground: '#fff' },
]

export function Home() {
	const {
		categoryQuery,
		keywordQuery,
		state: {
			category: { selectedCategory, setSelectedCategory },
			keyword: { selectedKeyword, setSelectedKeyword },
		},
	} = useSearch()

	const { model, getInputProps, onSubmit } = useSearchForm()
	const { fetchData } = useSearchSubmit({
		categoryId: selectedCategory,
		keyword: selectedKeyword,
	})

	const _ = useHome()
	const queryClient = useQueryClient()

	const categoryTopics = queryClient.getQueriesData({
		queryKey: ['home', 'categories'],
	})

	const categories = categoryTopics.map((category) => {
		const categoriesData = category?.[1]?.data

		const topics = categoriesData?.map((topic) => {
			const { category, categoryId, accountId, ...rest } = topic
			return rest
		})

		return {
			category: categoriesData?.[0]?.category,
			topics: topics,
		}
	})

	return (
		<Grid>
			<Col>
				<form onSubmit={onSubmit(fetchData)}>
					<Grid>
						<Col span={4}>
							<Select
								searchable={true}
								data={categoryQuery?.data || []}
								value={selectedCategory}
								onChange={(data) => {
									setSelectedCategory(data)
									getInputProps(model.categoryId).onChange(data)
								}}
								clearable={true}
								placeholder='Search category'
								nothingFound={'No categories found'}
							/>
						</Col>
						<Col span={6}>
							<MultiSelect
								data={keywordQuery?.data || []}
								value={selectedKeyword}
								onChange={(data) => {
									setSelectedKeyword(data)
									getInputProps(model.keyword).onChange(data.join(','))
								}}
								clearable={true}
								searchable={true}
								placeholder='Search keyword'
								nothingFound={'No keywords found'}
							/>
						</Col>
						<Col span={2}>
							<Button
								fullWidth={true}
								type={'submit'}>
								Search
							</Button>
						</Col>
					</Grid>
				</form>
			</Col>
			{categories.length > 0 &&
				categories?.map((item, index) => {
					const category = item?.category
					return (
						<Col
							key={category?.id}
							span={6}>
							<CategoryCard
								category={category}
								topics={item.topics}
								color={COLORS[index % COLORS.length]}
							/>
						</Col>
					)
				})}
		</Grid>
	)
}

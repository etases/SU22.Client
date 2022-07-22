import {
	Button,
	Grid,
	Input,
	Modal,
	MultiSelect,
	Select,
	Stack,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import { useMutation } from 'react-query'
import {
	fetchApi,
	useGlobalState,
	useHome,
	useSearch,
	useSearchForm,
	useSearchSubmit,
} from '~/hooks'
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
	const [modalOpen, setModalOpen] = useState(false)
	const [topic, setTopic] = useState(null)

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

	const [account] = useGlobalState({ store: 'account' })

	const newTopicMutation = useMutation({
		mutationKey: ['newTopic'],
		mutationFn: async () =>
			fetchApi({
				method: 'POST',
				endpoint: '/category',
				body: topic,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['home', 'categories'],
			})
			showNotification({
				message: `Topic ${topic.name} created successfully`,
			})
		},
	})

	return (
		<Grid>
			<Col>
				<form onSubmit={onSubmit(fetchData)}>
					<Grid>
						<Col span={account?.info?.role?.id === 1 ? 3 : 4}>
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
						<Col span={account?.info?.role?.id === 1 ? 5 : 6}>
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
						{account?.info?.role?.id === 1 && (
							<Col span={2}>
								<Button
									color={'green'}
									fullWidth={true}
									type={'button'}
									onClick={() => setModalOpen(true)}>
									Create
								</Button>
							</Col>
						)}
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
			<Modal
				opened={modalOpen}
				onClose={() => setModalOpen(false)}>
				<Stack>
					<Input
						placeholder={'Enter Category name'}
						required={true}
						value={topic?.name}
						onChange={(e) => setTopic({ ...topic, name: e.target.value })}
					/>
					<Input
						placeholder={'Enter Category description'}
						required={true}
						value={topic?.description}
						onChange={(e) =>
							setTopic({ ...topic, description: e.target.value })
						}
					/>
					<Button onClick={() => newTopicMutation.mutate()}>Create</Button>
				</Stack>
			</Modal>
		</Grid>
	)
}

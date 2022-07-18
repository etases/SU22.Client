import { Button, Grid, Select, SimpleGrid } from '@mantine/core'
import { useSearchBarQuery } from '~/hooks'
import CategoryList from './CategoryList'

// search button component
function SearchButton(props) {
	const {
		categoryResult,
		keywordResult,
		setSelectedCategory,
		selectedCategory,
		getTopicList,
	} = useSearchBarQuery()

	const colorList = ['#5188F7', '#F15E32', '#3CD260']
	// const form = useForm({
	//   initialValues: {
	//     categoryId: 0,
	//     keyword: 'ha',
	//   },

	// })

	// const fetchCommentByKeyword = useKeyword({ keyword: form.values.keyword })

	//check if data is loading
	if (categoryResult.isFetching) {
		return <div>Loading...</div>
	}
	console.log(getTopicList.data)
	return (
		// <Grid>
		//   <Grid.Col span={1}>
		//     <Button
		//       fullWidth
		//       className="add-button"
		//       // onClick={() => }
		//       radius="md">
		//       {/* <i className="fas fa-plus"></i> */}
		//     </Button>
		//   </Grid.Col>
		<>
			<Grid>
				{/* <Grid.Col span={12}> */}
				{/* <form
          style={{ display: 'flex' }}
          onSubmit={
            // handleSubmit
            form.onSubmit((values) => console.log(values))
          }> */}
				<Grid.Col span={6}>
					<Select
						placeholder='Category'
						data={categoryResult.data || []}
						variant='filled'
						radius='md'
						searchable
						nothingFound='What?'
						// value={selectedCategory}
						// {...form.getInputProps('categoryId')}
						onChange={(value) => setSelectedCategory(value)}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Select
						placeholder='Keyword...'
						variant='filled'
						radius='md'
						data={keywordResult?.data || []}
						searchable
						nothingFound='What?'
						// {...form.getInputProps('keyword')}
					/>
				</Grid.Col>
				<Grid.Col span={0}>
					{/*button to submit form*/}
					<Button
						type='submit'
						style={{ display: 'none' }}
					/>
				</Grid.Col>
				{/* </form> */}
				{/* </Grid.Col> */}
			</Grid>
			<SimpleGrid cols={2}>
				{categoryResult.data?.map((cat, index) => (
					<CategoryList
						key={index}
						label={cat.label}
						index={index}
						colorList={colorList[index]}
					/>
				))}
			</SimpleGrid>
		</>
	)
}

export default function SearchBar() {
	return (
		<div>
			<SearchButton />
		</div>
	)
}

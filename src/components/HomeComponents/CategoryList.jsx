import { SimpleGrid } from '@mantine/core'
import { useSearchBarQuery } from '~/hooks'
// import QuestionList from './QuestionList'

export default function CategoryList(colors, catList) {
  const {
    categoryResult,
    setSelectedCategory,
    selectedCategory,
    getTopicList,
  } = useSearchBarQuery()
  const colorList = ['#5188F7', '#F15E32', '#3CD260']

  if (categoryResult.isFetching) return <div>Loading...</div>
  const listItems = categoryResult.data?.map((cat, index) => (
    <div
      key={index}
      style={{
        width: 400,
        height: 200,
        backgroundColor: colorList[index],
        borderRadius: 10,
        padding: 10,
      }}>
      {cat.label}

      {/* <QuestionList catId={cat.value} /> */}
    </div>
  ))

  return <SimpleGrid cols={2}>{listItems}</SimpleGrid>
}

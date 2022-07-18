// import QuestionList from './QuestionList'

export default function CategoryList(category) {
	const { label, colorList } = category

	// console.log('catList', data)
	return (
		<div
			style={{
				width: 400,
				height: 200,
				backgroundColor: colorList,
				borderRadius: 10,
				padding: 10,
			}}>
			{label}

			{/* <QuestionList catId={cat.value} /> */}
		</div>
	)
}

// import QuestionList from './QuestionList'

import QuestionList from './QuestionList'

export default function CategoryList(category) {
	const { label, colorList, questionDetail } = category
	// console.log('catList', data)

	return (
		<div
			style={{
				width: 380,
				height: 200,
				backgroundColor: colorList,
				borderRadius: 10,
				padding: 10,
			}}>
			{label}

			<QuestionList detail={questionDetail} />
		</div>
	)
}

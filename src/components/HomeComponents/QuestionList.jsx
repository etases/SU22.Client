export default function QuestionList(catId) {
	const { question } = catId

	return (
		<div
			style={{
				height: 150,
				backgroundColor: 'white',
				borderRadius: 10,
				marginTop: 4,
				padding: 10,
			}}>
			{question}
		</div>
	)
}

export default function QuestionList(question) {
	const { detail } = question
	const mapList = detail?.map((q, index) => <div key={index}>{q}</div>)
	return (
		<div
			style={{
				height: 150,
				backgroundColor: 'white',
				borderRadius: 10,
				marginTop: 4,
				padding: 10,
			}}>
			{mapList}
		</div>
	)
}

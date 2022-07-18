module.exports = (request) => {
	return {
		data: [
			{
				id: 1,
				content: 'This is a test comment',
				keyword: 'test',
				account: {
					username: 'test'
				}
			},
			{
				id: 2,
				content: 'This is a test comment',
				keyword: 'test',
				account: {
					username: 'test'
				}
			},
			{
				id: 3,
				content: 'This is a test comment',
				keyword: 'test',
				account: {
					username: 'test'
				}
			}
		],
		errorCode: 0,
		success: true,
		message: "Get comments successfully"
	}
}
module.exports = function (request) {
	switch (request.method) {
		case 'POST':
			return {
				status: 200,
				data: {
					token: 'new token',
				},
			}
		default:
			return {
				status: 405,
				message: 'Method not allowed',
				success: false,
			}
	}
}

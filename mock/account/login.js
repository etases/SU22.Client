module.exports = (request) => {
    switch (request.method) {
        case 'POST':
            return {
                status: 200,
                body: {
                    message: 'Successfully logged in user',
                    data: {
                        ...request.body,
                        token: request.headers.authorization,
                    },
                },
            }
        default:
            return {
                status: 405,
                request,
            }
    }
}

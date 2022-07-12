// const ACCOUNT = []

module.exports = function (request) {
    switch (request.method) {
        case 'POST':
            return {
                status: 200,
                data: {
                    status: 200,
                    success: true,
                    message: 'Register success',
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

module.exports = (request) => {
    switch (request.method) {
        case 'GET':
            return {
                status: 200,
                request,
            }
        default:
            return {
                status: 405,
                request,
            }
    }
}

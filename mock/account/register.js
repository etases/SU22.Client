module.exports = (request) => {
    return {
        status: 200,
        body: {
            message: 'Successfully registered user',
            data: request.body,
        },
    }
}

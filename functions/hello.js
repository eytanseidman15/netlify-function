exports.handler = async event => {
    const subject = event.queryStringParameters.name || 'David'
    return {
        statusCode: 200,
        body: `Hello ${subject}`
    }
}
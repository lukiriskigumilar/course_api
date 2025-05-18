const customResponse = (res, statusCode, message, data, count = null) => {
    const response = {
        statusCode: statusCode,
        message: message,
    };
    if(count != null && count != undefined) {
        response.count = count;
    }
    response.data = data;

    res.status(statusCode).json(response);
}

export { customResponse };
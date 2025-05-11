const customResponse = (res, statusCode, message, data) => {
    const response = {
        statusCode: statusCode,
        message: message,
        data: data
    };
    res.status(statusCode).json(response);
}

export { customResponse };
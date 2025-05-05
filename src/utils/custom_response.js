exports.customResponse = (res, statusCode, message, data) => {
    const response = {
        status: statusCode,
        message: message,
        data: data
    };
    res.status(statusCode).json(response);
}
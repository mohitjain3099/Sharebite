// Response handler for the application
export const setResponse = (object, response) => {
    response.status(200).json(object); // You may choose an appropriate status code here
}

// Error response handler for the application
export const setErrorResponse = (error, response, statusCode) => {
    console.log(error);
    response.status(statusCode || 500).json({ // Default status code is 500
        error: {
            code: statusCode ? getStatusName(statusCode) : 'InternalServerError',
            message: 'Error occurred while processing the request'
        }
    });
}

// Helper function to get status name
const getStatusName = (statusCode) => {
    switch (statusCode) {
        case 400: return 'BadRequest';
        case 404: return 'NotFound';
        case 401: return 'Unauthorized';
        case 403: return 'Forbidden';
        case 405: return 'MethodNotAllowed';
        default: return 'InternalServerError';
    }
}

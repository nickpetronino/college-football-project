/**
 * Response Handler Utility
 * Standardized API response formats
 */

/**
 * Send success response
 */
const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString(),
    });
};

/**
 * Send error response
 */
const sendError = (
    res,
    message = 'An error occurred',
    statusCode = 500,
    errors = null
) => {
    const response = {
        success: false,
        message,
        timestamp: new Date().toISOString(),
    };

    if (errors) {
        response.errors = errors;
    }

    res.status(statusCode).json(response);
};

/**
 * Send paginated response
 */
const sendPaginated = (res, data, pagination, message = 'Success') => {
    res.status(200).json({
        success: true,
        message,
        data,
        pagination: {
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            pages: Math.ceil(pagination.total / pagination.limit),
        },
        timestamp: new Date().toISOString(),
    });
};

module.exports = {
    sendSuccess,
    sendError,
    sendPaginated,
    // Aliases for backward compatibility with existing controllers
    success: sendSuccess,
    error: sendError,
};

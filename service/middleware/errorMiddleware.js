/**
 * Error Handling Middleware
 */

/**
 * 404 Not Found Handler
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Global Error Handler
 */
const errorHandler = (err, req, res, next) => {
    // Set status code (use 500 if status code is 200)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Prepare error response
    const errorResponse = {
        message: err.message,
        status: statusCode,
    };

    // Include stack trace in development mode
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // Handle specific error types
    if (err.name === 'ValidationError') {
        errorResponse.message = 'Validation Error';
        errorResponse.errors = Object.values(err.errors).map((e) => e.message);
    }

    if (err.name === 'CastError') {
        errorResponse.message = 'Invalid ID format';
    }

    if (err.code === 11000) {
        errorResponse.message = 'Duplicate field value entered';
        errorResponse.field = Object.keys(err.keyValue)[0];
    }

    res.json(errorResponse);
};

module.exports = {
    notFound,
    errorHandler,
};

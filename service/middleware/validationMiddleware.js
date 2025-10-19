/**
 * Validation Middleware
 * Helper functions for request validation
 */

const { validationResult } = require('express-validator');

/**
 * Validates the request based on express-validator rules
 * Returns 400 if validation fails
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
                value: err.value,
            })),
        });
    }

    next();
};

module.exports = validate;

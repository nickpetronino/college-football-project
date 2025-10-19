/**
 * Health Check Controller
 */

const mongoose = require('mongoose');

/**
 * @desc    Get API health status
 * @route   GET /api/v1/health
 * @access  Public
 */
const getHealthStatus = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'NCAA Service is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
    });
};

/**
 * @desc    Get database connection status
 * @route   GET /api/v1/health/db
 * @access  Public
 */
const getDatabaseStatus = (req, res) => {
    const dbState = mongoose.connection.readyState;
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    const isHealthy = dbState === 1;
    const statusCode = isHealthy ? 200 : 503;

    res.status(statusCode).json({
        success: isHealthy,
        database: {
            status: states[dbState],
            name: mongoose.connection.name,
            host: mongoose.connection.host,
        },
        timestamp: new Date().toISOString(),
    });
};

module.exports = {
    getHealthStatus,
    getDatabaseStatus,
};

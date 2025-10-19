/**
 * Environment Configuration
 * Centralized access to environment variables with validation
 */

const config = {
    // Server Configuration
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,

    // Database Configuration
    mongoUri:
        process.env.MONGODB_URI || 'mongodb://localhost:27017/ncaaservice',

    // API Configuration
    apiVersion: process.env.API_VERSION || 'v1',

    // Logging Configuration
    logLevel: process.env.LOG_LEVEL || 'info',

    // Helper methods
    isDevelopment() {
        return this.nodeEnv === 'development';
    },

    isProduction() {
        return this.nodeEnv === 'production';
    },

    isTest() {
        return this.nodeEnv === 'test';
    },
};

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI'];

const validateConfig = () => {
    const missingVars = requiredEnvVars.filter(
        (varName) => !process.env[varName]
    );

    if (missingVars.length > 0) {
        console.warn(
            `⚠️ Warning: Missing environment variables: ${missingVars.join(
                ', '
            )}`
        );
        console.warn('Using default values. Please check your .env file.');
    }
};

validateConfig();

module.exports = config;

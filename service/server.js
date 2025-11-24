/**
 * NCAA Service - Main Server Entry Point
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Import configurations
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Import routes
const healthRoutes = require('./routes/healthRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
// Add more route imports here as you build them
// const teamRoutes = require('./routes/teamRoutes');
// const playerRoutes = require('./routes/playerRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// API Routes
const API_VERSION = process.env.API_VERSION || 'v1';
app.use(`/api/${API_VERSION}/health`, healthRoutes);
app.use(`/api/${API_VERSION}/schedules`, scheduleRoutes);
// Add more routes here
// app.use(`/api/${API_VERSION}/teams`, teamRoutes);
// app.use(`/api/${API_VERSION}/players`, playerRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'NCAA Service API',
        version: API_VERSION,
        status: 'running',
    });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `🚀 NCAA Service running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    process.exit(1);
});

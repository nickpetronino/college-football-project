/**
 * Health Check Routes
 * Used for monitoring and uptime checks
 */

const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

// GET /api/v1/health - Basic health check
router.get('/', healthController.getHealthStatus);

// GET /api/v1/health/db - Database health check
router.get('/db', healthController.getDatabaseStatus);

module.exports = router;

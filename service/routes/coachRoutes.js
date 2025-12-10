/**
 * Coach Routes
 * API endpoints for coach playthrough data management
 */

const express = require('express');
const {
    createCoach,
    getCoachByPlaythroughId,
    updateCoach,
    getAllCoaches,
    getMostRecentCoach,
} = require('../controllers/coachController');

const router = express.Router();

// Get most recently modified coach (must be before /:playthroughId)
router.get('/most-recent', getMostRecentCoach);

// Get all coaches
router.get('/', getAllCoaches);

// Create a new coach playthrough
router.post('/', createCoach);

// Get coach by playthrough ID
router.get('/:playthroughId', getCoachByPlaythroughId);

// Update coach playthrough
router.put('/:playthroughId', updateCoach);

module.exports = router;


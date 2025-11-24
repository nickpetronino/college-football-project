/**
 * Schedule Routes
 * API endpoints for schedule management
 */

const express = require('express');
const {
    createSchedule,
    getAllSchedules,
    getSchedulesByPlaythrough,
    getScheduleByPlaythroughAndYear,
    getSchedulesByYear,
    getSchedulesByTeam,
    updateSchedule,
    addGameToSchedule,
    updateGameInSchedule,
    removeGameFromSchedule,
    deleteSchedule,
    getScheduleStats,
} = require('../controllers/scheduleController');

const router = express.Router();

// Main schedule routes
router.route('/').get(getAllSchedules).post(createSchedule);

// Routes for getting schedules by different criteria
router.get('/playthrough/:playthroughId', getSchedulesByPlaythrough);
router.get('/year/:year', getSchedulesByYear);
router.get('/team/:teamName', getSchedulesByTeam);

// Specific schedule routes (playthroughId + year as composite key)
router
    .route('/:playthroughId/:year')
    .get(getScheduleByPlaythroughAndYear)
    .put(updateSchedule)
    .delete(deleteSchedule);

// Schedule statistics
router.get('/:playthroughId/:year/stats', getScheduleStats);

// Game management routes
router.route('/:playthroughId/:year/games').post(addGameToSchedule);

router
    .route('/:playthroughId/:year/games/:week')
    .put(updateGameInSchedule)
    .delete(removeGameFromSchedule);

module.exports = router;

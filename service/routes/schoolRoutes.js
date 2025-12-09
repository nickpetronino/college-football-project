/**
 * School Routes
 * API endpoints for school data management
 */

const express = require('express');
const {
    getAllSchools,
    getSchoolByName,
    getSchoolsByConference,
    getAllConferences,
    getSchoolsByState,
    getSchoolRivals,
} = require('../controllers/schoolController');

const router = express.Router();

// Get all schools (with optional filters)
router.get('/', getAllSchools);

// Get all conferences
router.get('/conferences', getAllConferences);

// Get schools by conference
router.get('/conference/:conference', getSchoolsByConference);

// Get schools by state
router.get('/state/:state', getSchoolsByState);

// Get rivals of a school
router.get('/:name/rivals', getSchoolRivals);

// Get school by name (must be last to avoid conflicts)
router.get('/:name', getSchoolByName);

module.exports = router;







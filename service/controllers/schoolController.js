/**
 * School Controller
 * Handles operations for college football school data
 */

const School = require('../models/schoolModel');
const asyncHandler = require('../utils/asyncHandler');
const responseHandler = require('../utils/responseHandler');

/**
 * @desc    Get all schools
 * @route   GET /api/v1/schools
 * @access  Public
 */
const getAllSchools = asyncHandler(async (req, res) => {
    const { conference, state, isActive } = req.query;
    
    let query = {};
    
    if (conference) {
        query.conference = conference;
    }
    
    if (state) {
        query.state = state;
    }
    
    if (isActive !== undefined) {
        query.isActive = isActive === 'true';
    }
    
    const schools = await School.find(query)
        .sort({ conference: 1, name: 1 })
        .select('-__v');
    
    responseHandler.success(res, schools, 'Schools retrieved successfully');
});

/**
 * @desc    Get school by name
 * @route   GET /api/v1/schools/:name
 * @access  Public
 */
const getSchoolByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    
    const school = await School.findOne({ name }).select('-__v');
    
    if (!school) {
        return responseHandler.error(res, 'School not found', 404);
    }
    
    responseHandler.success(res, school, 'School retrieved successfully');
});

/**
 * @desc    Get schools by conference
 * @route   GET /api/v1/schools/conference/:conference
 * @access  Public
 */
const getSchoolsByConference = asyncHandler(async (req, res) => {
    const { conference } = req.params;
    
    const schools = await School.findByConference(conference);
    
    responseHandler.success(res, schools, 'Schools retrieved successfully');
});

/**
 * @desc    Get all conferences
 * @route   GET /api/v1/schools/conferences
 * @access  Public
 */
const getAllConferences = asyncHandler(async (req, res) => {
    const conferences = await School.getAllConferences();
    
    responseHandler.success(res, conferences, 'Conferences retrieved successfully');
});

/**
 * @desc    Get schools by state
 * @route   GET /api/v1/schools/state/:state
 * @access  Public
 */
const getSchoolsByState = asyncHandler(async (req, res) => {
    const { state } = req.params;
    
    const schools = await School.findByState(state);
    
    responseHandler.success(res, schools, 'Schools retrieved successfully');
});

/**
 * @desc    Get rivals of a school
 * @route   GET /api/v1/schools/:name/rivals
 * @access  Public
 */
const getSchoolRivals = asyncHandler(async (req, res) => {
    const { name } = req.params;
    
    const school = await School.findOne({ name }).select('rivals');
    
    if (!school) {
        return responseHandler.error(res, 'School not found', 404);
    }
    
    // Get full school objects for rivals
    const rivals = await School.find({
        name: { $in: school.rivals },
        isActive: true,
    })
        .sort({ name: 1 })
        .select('-__v');
    
    responseHandler.success(res, rivals, 'Rivals retrieved successfully');
});

module.exports = {
    getAllSchools,
    getSchoolByName,
    getSchoolsByConference,
    getAllConferences,
    getSchoolsByState,
    getSchoolRivals,
};


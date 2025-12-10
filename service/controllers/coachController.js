/**
 * Coach Controller
 * Handles operations for coach playthrough data
 */

const Coach = require('../models/coachModel');
const asyncHandler = require('../utils/asyncHandler');
const responseHandler = require('../utils/responseHandler');

/**
 * @desc    Create a new coach playthrough
 * @route   POST /api/v1/coaches
 * @access  Public
 */
const createCoach = asyncHandler(async (req, res) => {
    const { playthroughId, firstName, lastName, style, selectedTeam, almaMater, pipeline } = req.body;

    // Check if playthrough already exists
    const existingCoach = await Coach.findOne({ playthroughId });
    if (existingCoach) {
        return responseHandler.error(
            res,
            'Playthrough already exists for this ID',
            400
        );
    }

    const coach = await Coach.create({
        playthroughId,
        firstName,
        lastName,
        style,
        selectedTeam,
        almaMater,
        pipeline,
    });

    // Populate school references
    await coach.populate('selectedTeam almaMater');

    responseHandler.success(res, coach, 'Coach playthrough created successfully', 201);
});

/**
 * @desc    Get coach by playthrough ID
 * @route   GET /api/v1/coaches/:playthroughId
 * @access  Public
 */
const getCoachByPlaythroughId = asyncHandler(async (req, res) => {
    const { playthroughId } = req.params;

    const coach = await Coach.findByPlaythroughId(playthroughId);

    if (!coach) {
        return responseHandler.error(res, 'Coach playthrough not found', 404);
    }

    responseHandler.success(res, coach, 'Coach playthrough retrieved successfully');
});

/**
 * @desc    Update coach playthrough
 * @route   PUT /api/v1/coaches/:playthroughId
 * @access  Public
 */
const updateCoach = asyncHandler(async (req, res) => {
    const { playthroughId } = req.params;
    const updateData = req.body;

    // Don't allow updating playthroughId
    delete updateData.playthroughId;

    const coach = await Coach.findOneAndUpdate(
        { playthroughId },
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).populate('selectedTeam almaMater');

    if (!coach) {
        return responseHandler.error(res, 'Coach playthrough not found', 404);
    }

    responseHandler.success(res, coach, 'Coach playthrough updated successfully');
});

/**
 * @desc    Get all coaches
 * @route   GET /api/v1/coaches
 * @access  Public
 */
const getAllCoaches = asyncHandler(async (req, res) => {
    const coaches = await Coach.find()
        .populate('selectedTeam almaMater')
        .sort({ createdAt: -1 })
        .select('-__v');

    responseHandler.success(res, coaches, 'Coaches retrieved successfully');
});

/**
 * @desc    Get most recently modified coach
 * @route   GET /api/v1/coaches/most-recent
 * @access  Public
 */
const getMostRecentCoach = asyncHandler(async (req, res) => {
    const coach = await Coach.find()
        .populate('selectedTeam almaMater')
        .sort({ updatedAt: -1 })
        .limit(1)
        .select('-__v');

    if (!coach || coach.length === 0) {
        return responseHandler.error(res, 'No coaches found', 404);
    }

    responseHandler.success(res, coach[0], 'Most recent coach retrieved successfully');
});

module.exports = {
    createCoach,
    getCoachByPlaythroughId,
    updateCoach,
    getAllCoaches,
    getMostRecentCoach,
};


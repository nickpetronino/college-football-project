/**
 * Schedule Controller
 * Handles CRUD operations for college football schedules
 */

const Schedule = require('../models/scheduleModel');
const asyncHandler = require('../utils/asyncHandler');
const responseHandler = require('../utils/responseHandler');

/**
 * @desc    Create a new schedule
 * @route   POST /api/schedules
 * @access  Public
 */
const createSchedule = asyncHandler(async (req, res) => {
    const { playthroughId, year, teamName, games, metadata } = req.body;

    // Check if schedule already exists for this playthrough and year
    const existingSchedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        year
    );
    if (existingSchedule) {
        return responseHandler.error(
            res,
            'Schedule already exists for this playthrough and year',
            409
        );
    }

    const schedule = await Schedule.create({
        playthroughId,
        year,
        teamName,
        games,
        metadata,
    });

    responseHandler.success(
        res,
        schedule,
        'Schedule created successfully',
        201
    );
});

/**
 * @desc    Get all schedules
 * @route   GET /api/schedules
 * @access  Public
 */
const getAllSchedules = asyncHandler(async (req, res) => {
    const schedules = await Schedule.find().sort({ createdAt: -1 });
    responseHandler.success(res, schedules, 'Schedules retrieved successfully');
});

/**
 * @desc    Get schedules by playthrough ID
 * @route   GET /api/schedules/playthrough/:playthroughId
 * @access  Public
 */
const getSchedulesByPlaythrough = asyncHandler(async (req, res) => {
    const { playthroughId } = req.params;
    const schedules = await Schedule.findByPlaythrough(playthroughId);
    responseHandler.success(res, schedules, 'Schedules retrieved successfully');
});

/**
 * @desc    Get schedule by playthrough ID and year
 * @route   GET /api/schedules/:playthroughId/:year
 * @access  Public
 */
const getScheduleByPlaythroughAndYear = asyncHandler(async (req, res) => {
    const { playthroughId, year } = req.params;
    const schedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        parseInt(year)
    );

    if (!schedule) {
        return responseHandler.error(res, 'Schedule not found', 404);
    }

    responseHandler.success(res, schedule, 'Schedule retrieved successfully');
});

/**
 * @desc    Get schedules by year
 * @route   GET /api/schedules/year/:year
 * @access  Public
 */
const getSchedulesByYear = asyncHandler(async (req, res) => {
    const { year } = req.params;
    const schedules = await Schedule.findByYear(parseInt(year));
    responseHandler.success(res, schedules, 'Schedules retrieved successfully');
});

/**
 * @desc    Get schedules by team name
 * @route   GET /api/schedules/team/:teamName
 * @access  Public
 */
const getSchedulesByTeam = asyncHandler(async (req, res) => {
    const { teamName } = req.params;
    const schedules = await Schedule.findByTeam(teamName);
    responseHandler.success(res, schedules, 'Schedules retrieved successfully');
});

/**
 * @desc    Update a schedule
 * @route   PUT /api/schedules/:playthroughId/:year
 * @access  Public
 */
const updateSchedule = asyncHandler(async (req, res) => {
    const { playthroughId, year } = req.params;
    const updateData = req.body;

    // Remove playthroughId and year from update data to prevent modification
    delete updateData.playthroughId;
    delete updateData.year;

    const schedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        parseInt(year)
    );

    if (!schedule) {
        return responseHandler.error(res, 'Schedule not found', 404);
    }

    // Update the schedule
    Object.assign(schedule, updateData);
    const updatedSchedule = await schedule.save();

    responseHandler.success(
        res,
        updatedSchedule,
        'Schedule updated successfully'
    );
});

/**
 * @desc    Add a game to a schedule
 * @route   POST /api/schedules/:playthroughId/:year/games
 * @access  Public
 */
const addGameToSchedule = asyncHandler(async (req, res) => {
    const { playthroughId, year } = req.params;
    const gameData = req.body;

    const schedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        parseInt(year)
    );

    if (!schedule) {
        return responseHandler.error(res, 'Schedule not found', 404);
    }

    // Check if game for this week already exists
    const existingGame = schedule.getGameByWeek(gameData.week);
    if (existingGame) {
        return responseHandler.error(
            res,
            'Game for this week already exists',
            409
        );
    }

    await schedule.addGame(gameData);

    responseHandler.success(
        res,
        schedule,
        'Game added to schedule successfully'
    );
});

/**
 * @desc    Update a game in a schedule
 * @route   PUT /api/schedules/:playthroughId/:year/games/:week
 * @access  Public
 */
const updateGameInSchedule = asyncHandler(async (req, res) => {
    const { playthroughId, year, week } = req.params;
    const gameData = req.body;

    const schedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        parseInt(year)
    );

    if (!schedule) {
        return responseHandler.error(res, 'Schedule not found', 404);
    }

    await schedule.updateGame(parseInt(week), gameData);

    responseHandler.success(res, schedule, 'Game updated successfully');
});

/**
 * @desc    Remove a game from a schedule
 * @route   DELETE /api/schedules/:playthroughId/:year/games/:week
 * @access  Public
 */
const removeGameFromSchedule = asyncHandler(async (req, res) => {
    const { playthroughId, year, week } = req.params;

    const schedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        parseInt(year)
    );

    if (!schedule) {
        return responseHandler.error(res, 'Schedule not found', 404);
    }

    await schedule.removeGame(parseInt(week));

    responseHandler.success(
        res,
        schedule,
        'Game removed from schedule successfully'
    );
});

/**
 * @desc    Delete a schedule
 * @route   DELETE /api/schedules/:playthroughId/:year
 * @access  Public
 */
const deleteSchedule = asyncHandler(async (req, res) => {
    const { playthroughId, year } = req.params;

    const schedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        parseInt(year)
    );

    if (!schedule) {
        return responseHandler.error(res, 'Schedule not found', 404);
    }

    await Schedule.findByIdAndDelete(schedule._id);

    responseHandler.success(res, null, 'Schedule deleted successfully');
});

/**
 * @desc    Get schedule statistics
 * @route   GET /api/schedules/:playthroughId/:year/stats
 * @access  Public
 */
const getScheduleStats = asyncHandler(async (req, res) => {
    const { playthroughId, year } = req.params;

    const schedule = await Schedule.findByPlaythroughAndYear(
        playthroughId,
        parseInt(year)
    );

    if (!schedule) {
        return responseHandler.error(res, 'Schedule not found', 404);
    }

    const stats = {
        totalGames: schedule.totalGames,
        homeGames: schedule.homeGames,
        awayGames: schedule.awayGames,
        byeWeeks: schedule.byeWeeks,
        teamName: schedule.teamName,
        year: schedule.year,
        playthroughId: schedule.playthroughId,
    };

    responseHandler.success(
        res,
        stats,
        'Schedule statistics retrieved successfully'
    );
});

module.exports = {
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
};

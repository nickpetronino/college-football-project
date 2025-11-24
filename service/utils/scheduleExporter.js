/**
 * Schedule Exporter Utility
 * Helper functions for exporting schedule data to MongoDB
 */

const Schedule = require('../models/scheduleModel');

/**
 * Export schedule data from frontend to MongoDB
 * @param {Object} scheduleData - Schedule data from frontend
 * @param {string} playthroughId - Unique playthrough identifier
 * @param {number} year - Season year
 * @param {string} teamName - Team name
 * @returns {Promise<Object>} - Created or updated schedule
 */
const exportSchedule = async (scheduleData, playthroughId, year, teamName) => {
    try {
        // Transform frontend schedule data to match our model
        const games = scheduleData.map((game) => ({
            week: game.week,
            location: game.location,
            opponent: game.opponent
                ? {
                      name: game.opponent.name,
                      logo: game.opponent.logo,
                      rank: game.opponent.rank,
                      record: game.opponent.record,
                      isRivalry: game.opponent.isRivalry,
                  }
                : null,
            isByeWeek: game.isByeWeek,
            isConferenceGame: game.isConferenceGame,
            score: game.score,
            wentToOvertime: game.wentToOvertime,
        }));

        // Check if schedule already exists
        const existingSchedule = await Schedule.findByPlaythroughAndYear(
            playthroughId,
            year
        );

        if (existingSchedule) {
            // Update existing schedule
            existingSchedule.teamName = teamName;
            existingSchedule.games = games;
            return await existingSchedule.save();
        } else {
            // Create new schedule
            return await Schedule.create({
                playthroughId,
                year,
                teamName,
                games,
            });
        }
    } catch (error) {
        throw new Error(`Failed to export schedule: ${error.message}`);
    }
};

/**
 * Import schedule data from MongoDB
 * @param {string} playthroughId - Playthrough identifier
 * @param {number} year - Season year
 * @returns {Promise<Object|null>} - Schedule data or null if not found
 */
const importSchedule = async (playthroughId, year) => {
    try {
        const schedule = await Schedule.findByPlaythroughAndYear(
            playthroughId,
            year
        );
        return schedule;
    } catch (error) {
        throw new Error(`Failed to import schedule: ${error.message}`);
    }
};

/**
 * Get all schedules for a playthrough
 * @param {string} playthroughId - Playthrough identifier
 * @returns {Promise<Array>} - Array of schedules
 */
const getPlaythroughSchedules = async (playthroughId) => {
    try {
        return await Schedule.findByPlaythrough(playthroughId);
    } catch (error) {
        throw new Error(
            `Failed to get playthrough schedules: ${error.message}`
        );
    }
};

/**
 * Delete a schedule
 * @param {string} playthroughId - Playthrough identifier
 * @param {number} year - Season year
 * @returns {Promise<boolean>} - True if deleted, false if not found
 */
const deleteSchedule = async (playthroughId, year) => {
    try {
        const schedule = await Schedule.findByPlaythroughAndYear(
            playthroughId,
            year
        );
        if (schedule) {
            await Schedule.findByIdAndDelete(schedule._id);
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(`Failed to delete schedule: ${error.message}`);
    }
};

/**
 * Get schedule statistics
 * @param {string} playthroughId - Playthrough identifier
 * @param {number} year - Season year
 * @returns {Promise<Object>} - Schedule statistics
 */
const getScheduleStatistics = async (playthroughId, year) => {
    try {
        const schedule = await Schedule.findByPlaythroughAndYear(
            playthroughId,
            year
        );
        if (!schedule) {
            return null;
        }

        return {
            totalGames: schedule.totalGames,
            homeGames: schedule.homeGames,
            awayGames: schedule.awayGames,
            byeWeeks: schedule.byeWeeks,
            teamName: schedule.teamName,
            year: schedule.year,
            playthroughId: schedule.playthroughId,
        };
    } catch (error) {
        throw new Error(`Failed to get schedule statistics: ${error.message}`);
    }
};

module.exports = {
    exportSchedule,
    importSchedule,
    getPlaythroughSchedules,
    deleteSchedule,
    getScheduleStatistics,
};

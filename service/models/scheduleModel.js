/**
 * Schedule Mongoose Model
 * Stores college football schedules with composite key (playthroughId + year)
 */

const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
    {
        playthroughId: {
            type: String,
            required: [true, 'Playthrough ID is required'],
            trim: true,
            maxlength: [100, 'Playthrough ID cannot exceed 100 characters'],
        },
        year: {
            type: Number,
            required: [true, 'Year is required'],
            min: [1900, 'Year must be at least 1900'],
            max: [2100, 'Year must be at most 2100'],
        },
        teamName: {
            type: String,
            required: [true, 'Team name is required'],
            trim: true,
            maxlength: [100, 'Team name cannot exceed 100 characters'],
        },
        games: [
            {
                week: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 15,
                },
                location: {
                    type: String,
                    enum: ['Home', 'Away'],
                    required: true,
                },
                opponent: {
                    name: {
                        type: String,
                        required: true,
                        trim: true,
                        maxlength: [
                            100,
                            'Opponent name cannot exceed 100 characters',
                        ],
                    },
                    logo: {
                        type: String,
                        trim: true,
                        maxlength: [
                            500,
                            'Logo URL cannot exceed 500 characters',
                        ],
                    },
                    rank: {
                        type: Number,
                        min: [1, 'Rank must be at least 1'],
                        max: [25, 'Rank cannot exceed 25'],
                    },
                    record: {
                        wins: {
                            type: Number,
                            min: [0, 'Wins cannot be negative'],
                            max: [15, 'Wins cannot exceed 15'],
                        },
                        losses: {
                            type: Number,
                            min: [0, 'Losses cannot be negative'],
                            max: [15, 'Losses cannot exceed 15'],
                        },
                    },
                    isRivalry: {
                        type: Boolean,
                        default: false,
                    },
                },
                isByeWeek: {
                    type: Boolean,
                    default: false,
                },
                isConferenceGame: {
                    type: Boolean,
                    default: false,
                },
                score: {
                    home: {
                        type: Number,
                        min: [0, 'Home score cannot be negative'],
                    },
                    away: {
                        type: Number,
                        min: [0, 'Away score cannot be negative'],
                    },
                },
                wentToOvertime: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        metadata: {
            type: Map,
            of: String,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Compound index for unique constraint on playthroughId + year
scheduleSchema.index({ playthroughId: 1, year: 1 }, { unique: true });

// Additional indexes for better query performance
scheduleSchema.index({ playthroughId: 1 });
scheduleSchema.index({ year: 1 });
scheduleSchema.index({ teamName: 1 });

// Virtual properties
scheduleSchema.virtual('totalGames').get(function () {
    return this.games.filter((game) => !game.isByeWeek).length;
});

scheduleSchema.virtual('homeGames').get(function () {
    return this.games.filter(
        (game) => game.location === 'Home' && !game.isByeWeek
    ).length;
});

scheduleSchema.virtual('awayGames').get(function () {
    return this.games.filter(
        (game) => game.location === 'Away' && !game.isByeWeek
    ).length;
});

scheduleSchema.virtual('byeWeeks').get(function () {
    return this.games.filter((game) => game.isByeWeek).length;
});

scheduleSchema.virtual('conferenceGames').get(function () {
    return this.games.filter(
        (game) => game.isConferenceGame && !game.isByeWeek
    ).length;
});

scheduleSchema.virtual('nonConferenceGames').get(function () {
    return this.games.filter(
        (game) => !game.isConferenceGame && !game.isByeWeek
    ).length;
});

scheduleSchema.virtual('overtimeGames').get(function () {
    return this.games.filter((game) => game.wentToOvertime).length;
});

// Instance methods
scheduleSchema.methods.addGame = function (gameData) {
    this.games.push(gameData);
    return this.save();
};

scheduleSchema.methods.updateGame = function (week, gameData) {
    const gameIndex = this.games.findIndex((game) => game.week === week);
    if (gameIndex !== -1) {
        this.games[gameIndex] = { ...this.games[gameIndex], ...gameData };
        return this.save();
    }
    throw new Error(`Game for week ${week} not found`);
};

scheduleSchema.methods.removeGame = function (week) {
    this.games = this.games.filter((game) => game.week !== week);
    return this.save();
};

scheduleSchema.methods.getGameByWeek = function (week) {
    return this.games.find((game) => game.week === week);
};

scheduleSchema.methods.getGamesByLocation = function (location) {
    return this.games.filter(
        (game) => game.location === location && !game.isByeWeek
    );
};

scheduleSchema.methods.getGameResult = function (week) {
    const game = this.getGameByWeek(week);
    if (!game || game.isByeWeek || !game.score) {
        return null;
    }

    const homeScore = game.score.home || 0;
    const awayScore = game.score.away || 0;

    if (game.location === 'Home') {
        return homeScore > awayScore
            ? 'Win'
            : homeScore < awayScore
            ? 'Loss'
            : 'Tie';
    } else {
        return awayScore > homeScore
            ? 'Win'
            : awayScore < homeScore
            ? 'Loss'
            : 'Tie';
    }
};

scheduleSchema.methods.getWins = function () {
    return this.games.filter((game) => {
        if (game.isByeWeek || !game.score) return false;
        const result = this.getGameResult(game.week);
        return result === 'Win';
    }).length;
};

scheduleSchema.methods.getLosses = function () {
    return this.games.filter((game) => {
        if (game.isByeWeek || !game.score) return false;
        const result = this.getGameResult(game.week);
        return result === 'Loss';
    }).length;
};

scheduleSchema.methods.getTies = function () {
    return this.games.filter((game) => {
        if (game.isByeWeek || !game.score) return false;
        const result = this.getGameResult(game.week);
        return result === 'Tie';
    }).length;
};

// Static methods
scheduleSchema.statics.findByPlaythrough = function (playthroughId) {
    return this.find({ playthroughId }).sort({ year: -1 });
};

scheduleSchema.statics.findByPlaythroughAndYear = function (
    playthroughId,
    year
) {
    return this.findOne({ playthroughId, year });
};

scheduleSchema.statics.findByYear = function (year) {
    return this.find({ year });
};

scheduleSchema.statics.findByTeam = function (teamName) {
    return this.find({ teamName });
};

// Middleware hooks
scheduleSchema.pre('save', function (next) {
    // Validate that games array is not empty
    if (this.games.length === 0) {
        return next(new Error('Schedule must have at least one game'));
    }

    // Validate that week numbers are unique within the schedule
    const weeks = this.games.map((game) => game.week);
    const uniqueWeeks = [...new Set(weeks)];
    if (weeks.length !== uniqueWeeks.length) {
        return next(new Error('Week numbers must be unique within a schedule'));
    }

    // Sort games by week
    this.games.sort((a, b) => a.week - b.week);

    next();
});

// Validation for games array
scheduleSchema.path('games').validate(function (games) {
    if (!games || games.length === 0) {
        return false;
    }

    // Check for duplicate weeks
    const weeks = games.map((game) => game.week);
    const uniqueWeeks = [...new Set(weeks)];
    return weeks.length === uniqueWeeks.length;
}, 'Games must have unique week numbers');

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

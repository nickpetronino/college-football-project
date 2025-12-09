/**
 * Coach/Playthrough Mongoose Model
 * Stores coach playthrough information including personal details and team selection
 */

const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema(
    {
        playthroughId: {
            type: String,
            required: [true, 'Playthrough ID is required'],
            trim: true,
            unique: true,
            maxlength: [100, 'Playthrough ID cannot exceed 100 characters'],
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            maxlength: [50, 'Last name cannot exceed 50 characters'],
        },
        style: {
            type: String,
            required: [true, 'Coach style is required'],
            enum: ['Motivator', 'Recruiter', 'Tactician'],
        },
        selectedTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: [true, 'Selected team is required'],
        },
        almaMater: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'School',
            required: [true, 'Alma mater is required'],
        },
        pipeline: {
            type: String,
            required: [true, 'Pipeline description is required'],
            trim: true,
            maxlength: [500, 'Pipeline description cannot exceed 500 characters'],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Indexes for better query performance
coachSchema.index({ playthroughId: 1 }, { unique: true });
coachSchema.index({ selectedTeam: 1 });
coachSchema.index({ almaMater: 1 });
coachSchema.index({ style: 1 });
coachSchema.index({ createdAt: -1 });

// Virtual properties
coachSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Static methods
coachSchema.statics.findByPlaythroughId = function (playthroughId) {
    return this.findOne({ playthroughId }).populate('selectedTeam almaMater');
};

// Middleware hooks
coachSchema.pre('save', function (next) {
    // Trim and normalize fields
    if (this.isModified('firstName')) {
        this.firstName = this.firstName.trim();
    }
    if (this.isModified('lastName')) {
        this.lastName = this.lastName.trim();
    }
    if (this.isModified('pipeline')) {
        this.pipeline = this.pipeline.trim();
    }
    if (this.isModified('playthroughId')) {
        this.playthroughId = this.playthroughId.trim();
    }
    next();
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;


/**
 * School Mongoose Model
 * Stores college football school information including location and conference
 */

const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'School name is required'],
            trim: true,
            unique: true,
            maxlength: [100, 'School name cannot exceed 100 characters'],
        },
        icon: {
            type: String,
            required: [true, 'School icon/logo URL is required'],
            trim: true,
            maxlength: [500, 'Icon URL cannot exceed 500 characters'],
        },
        conference: {
            type: String,
            required: [true, 'Conference is required'],
            trim: true,
            maxlength: [100, 'Conference name cannot exceed 100 characters'],
            enum: [
                'SEC',
                'Big Ten',
                'Big 12',
                'ACC',
                'Pac-12',
                'AAC',
                'C-USA',
                'MAC',
                'Mountain West',
                'Sun Belt',
                'Independent',
                'Other',
            ],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            maxlength: [100, 'City name cannot exceed 100 characters'],
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true,
            maxlength: [50, 'State name cannot exceed 50 characters'],
        },
        colors: {
            type: [String],
            default: [],
            validate: {
                validator: function (colors) {
                    // Validate hex color format if colors are provided
                    if (colors.length === 0) return true;
                    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                    return colors.every(
                        (color) => typeof color === 'string' && hexPattern.test(color)
                    );
                },
                message: 'Colors must be valid hex color codes (e.g., #FF0000)',
            },
        },
        mascot: {
            type: String,
            trim: true,
            maxlength: [100, 'Mascot name cannot exceed 100 characters'],
        },
        rivals: {
            type: [String],
            default: [],
            validate: {
                validator: function (rivals) {
                    // Validate that all rivals are strings
                    return rivals.every((rival) => typeof rival === 'string');
                },
                message: 'Rivals must be an array of school names',
            },
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Indexes for better query performance
// Note: name already has an index from unique: true
schoolSchema.index({ conference: 1 });
schoolSchema.index({ state: 1 });
schoolSchema.index({ city: 1 });
schoolSchema.index({ isActive: 1 });
schoolSchema.index({ conference: 1, name: 1 });
schoolSchema.index({ mascot: 1 });
schoolSchema.index({ rivals: 1 });

// Virtual properties
schoolSchema.virtual('fullLocation').get(function () {
    return `${this.city}, ${this.state}`;
});

// Static methods
schoolSchema.statics.findByConference = function (conference) {
    return this.find({ conference, isActive: true }).sort({ name: 1 });
};

schoolSchema.statics.findByState = function (state) {
    return this.find({ state, isActive: true }).sort({ name: 1 });
};

schoolSchema.statics.findActive = function () {
    return this.find({ isActive: true }).sort({ conference: 1, name: 1 });
};

schoolSchema.statics.getAllConferences = function () {
    return this.distinct('conference', { isActive: true }).sort();
};

schoolSchema.statics.findRivals = function (schoolName) {
    return this.find({ rivals: schoolName, isActive: true }).sort({ name: 1 });
};

schoolSchema.statics.findByMascot = function (mascotName) {
    return this.find({ mascot: mascotName, isActive: true }).sort({ name: 1 });
};

// Instance methods
schoolSchema.methods.toggleActive = function () {
    this.isActive = !this.isActive;
    return this.save();
};

// Middleware hooks
schoolSchema.pre('save', function (next) {
    // Trim and normalize fields
    if (this.isModified('name')) {
        this.name = this.name.trim();
    }
    if (this.isModified('conference')) {
        this.conference = this.conference.trim();
    }
    if (this.isModified('city')) {
        this.city = this.city.trim();
    }
    if (this.isModified('state')) {
        this.state = this.state.trim();
    }
    if (this.isModified('mascot')) {
        this.mascot = this.mascot?.trim();
    }
    // Trim rival names
    if (this.isModified('rivals')) {
        this.rivals = this.rivals.map((rival) => rival.trim());
    }
    next();
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;

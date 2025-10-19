/**
 * Example Mongoose Model
 * This is a template for creating new models
 */

const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
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

// Indexes for better query performance
exampleSchema.index({ name: 1 });
exampleSchema.index({ status: 1 });

// Virtual properties
exampleSchema.virtual('isActive').get(function () {
    return this.status === 'active';
});

// Instance methods
exampleSchema.methods.toggleStatus = function () {
    this.status = this.status === 'active' ? 'inactive' : 'active';
    return this.save();
};

// Static methods
exampleSchema.statics.findByStatus = function (status) {
    return this.find({ status });
};

// Middleware hooks
exampleSchema.pre('save', function (next) {
    // Example: Trim name before saving
    if (this.isModified('name')) {
        this.name = this.name.trim();
    }
    next();
});

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;

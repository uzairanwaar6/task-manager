const mongoose = require('mongoose');
const npmValidator = require('validator');
const constants = require('../utils/constants');

const model = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxLength: [1000, 'Description cannot be greaterh than 1000 characters'],
        minLength: [50, 'At least 50 charactes are required in the Description'],
        required: [true, 'You must enter description to the task']
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdOn: { type: Date },
    createdBy: {
        type: String,
        required: [true, 'You must provide a valid email address'],
        validate: {
            message: constants.GENERIC_ERROR_MESSAGE,
            validator(value) {
                if (!npmValidator.isEmail(value))
                    throw new Error(`Invalid email provided. ${value}`);
            }
        }
    },
    lastModifiedOn: { type: Date },
    lastModifiedBy: { type: String },
};

const Task = mongoose.model('Task', model);

module.exports = {
    Task
};

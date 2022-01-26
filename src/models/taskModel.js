const mongoose = require('mongoose');
const npmValidator = require('validator');
const constants = require('../utils/constants');

const model = {
    name: {
        type: String,
        trim: true,
        required: [true, 'You must enter task name'],
        maxLength: [50, 'Name cannot be greaterh than 50 characters'],
        minLength: [5, 'At least 5 charactes are required for the Task Name'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [1000, 'Description cannot be greaterh than 1000 characters'],
        minLength: [10, 'At least 10 charactes are required in the Description'],
        required: [true, 'You must enter description to the task']
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
};

const Task = mongoose.model('Task', model);

module.exports =Task;

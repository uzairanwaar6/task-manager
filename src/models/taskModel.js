const mongoose = require('mongoose');
const npmValidator = require('validator');
const constants = require('../utils/constants');

const schema = new mongoose.Schema({
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
},
    { timestamps: true });

schema.pre('save', async function (next) {
    console.log('save middleware for tasks');
    next();
});

const Task = mongoose.model('Task', schema);

module.exports = Task;

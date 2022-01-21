const mongose = require('mongoose');
const npmValidator = require('validator');

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
            message: 'One or more validation rules are failed',
            validator(value) {
                if (!npmValidator.isEmail(value))
                    throw new Error(`Invalid email provided. ${value}`);
            }
        }
    },
    lastModifiedOn: { type: Date },
    lastModifiedBy: { type: String },
    password: {
        type: String,
        required: { values: true, message: 'Password cannot be empty' },
        trim: true,
        minLength: [6, 'Password must contain at least 6 characters'],
        maxLength: [256, 'Password cannot be greater than 256 characters'],
        validate: {
            validator(value) {
                console.log(value, this.name);
                if (value.toLowerCase().includes(this.name.toLowerCase()))
                    throw new Error('Password cannot contain the same word you entered in name field');
                if (value.toLowerCase().includes('password'))
                    throw new Error('Password cannot contain the word "Password"');

            },
            message: 'One or more validation rules are failed'
        }
    }
};

const Task = mongose.model('Task', model);

module.exports = {
    Task
};

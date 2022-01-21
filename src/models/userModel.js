const mongoose = require('mongoose');
const npmValidator = require('validator');
const constants = require('../utils/constants');

const model = {
    firstName: {
        type: String,
        required: [true, 'firstName cannot be empty'],
        minLength: [3, 'firstName cannot be less than 3 characters'],
        maxLength: [10, 'firstName cannot exceed 10 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'lastName cannot be empty'],
        minLength: [3, 'lastName cannot be less than 3 characters'],
        maxLength: [10, 'lastName cannot exceed 10 characters'],
    },
    username: {
        type: String,
        required: [true, 'username cannot be empty'],
        minLength: [3, 'username cannot be less than 3 characters'],
        maxLength: [10, 'username cannot exceed 10 characters'],
        validate: {
            validator(value) {
                if (value.includes(' '))
                    throw new Error('username cannot contain empty space');
            },
            message: constants.GENERIC_ERROR_MESSAGE
        },
    },
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
            message: constants.GENERIC_ERROR_MESSAGE
        }
    },
    email: {
        type: String,
        required: [true, 'You must provide a valid email address'],
        validate: {
            message: constants.GENERIC_ERROR_MESSAGE,
            validator(value) {
                if (!npmValidator.isEmail(value))
                    throw new Error(`Invalid email provided. ${value}`);
            }
        }
    }
};


const User = mongoose.model('User', model);
module.exports = User;
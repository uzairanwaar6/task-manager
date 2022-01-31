const mongoose = require('mongoose');
const npmValidator = require('validator');
const constants = require('../utils/constants');
const utils = require('../utils/app_utils');

const schema = new mongoose.Schema({
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
        unique: true,
        required: [true, 'username cannot be empty'],
        minLength: [3, 'username cannot be less than 3 characters'],
        maxLength: [20, 'username cannot exceed 20 characters'],
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
            validator(value, second) {
                //     console.log(value);
                //    // console.log(this)

                //     if (value.toLowerCase().includes(this.firstName.toLowerCase()))
                //         throw new Error('Password cannot contain the same word you entered in firstName field');

                //     //     if (value.toLowerCase().includes(this.lastName.toLowerCase()))
                //     //     throw new Error('Password cannot contain the same word you entered in lastName field');

                if (value.toLowerCase().includes('password'))
                    throw new Error('Password cannot contain the word "Password"');

            },
            message: constants.GENERIC_ERROR_MESSAGE
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'You must provide a valid email address'],
        validate: {
            message: constants.GENERIC_ERROR_MESSAGE,
            validator(value) {
                if (!npmValidator.isEmail(value))
                    throw new Error(`Invalid email provided. ${value}`);
            }
        }
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
});

schema.pre('save', async function (next) {
    await User.hashPassword(this);
    next();
});

schema.methods.createToken = async function () {
    const payload = {
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username
    };
    delete payload.password;

    const token = await utils.createJWT(payload);
    this.tokens.push({ token });
    this.save();
    return token;
};

schema.statics.hashPassword = async (model) => {
    if (model.isModified('password')) {
        model.password = await utils.hash(model.password);
    }
};

schema.statics.verifyPassword = async (password, hashedPassword) => {
    const isValid = await utils.compare(password, hashedPassword);
    return isValid;
};



//We cannot use it here because it is a query middlware
// model.pre('findOneAndUpdate', async function (next) {
//     await hashPassword(this);
//     next();
// });

const User = mongoose.model('User', schema);

module.exports = User;
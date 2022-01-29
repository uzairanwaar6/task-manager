const constants = require('./constants');
const jwt = require('jsonwebtoken');

const parseDBError = function (error) {
    return Object.values(error.errors).map(item => {
        delete item.properties.reason
        return {
            field: item.path,
            properties: item.properties
        };
    });
};

const getErrorObject = function (error) {
    try {
        return {
            error: this.parseDBError(error),
            code: error.statusCode || 400
        };
    }
    catch (ex) {
        return {
            error: error,
            code: error.statusCode || 500
        };
    }
};

const sendErrorResponse = function (error, response) {
    error = this.getErrorObject(error);
    response.status(error.code).send(error.error.message);
};

const hash = async function (value) {
    const bcrypt = require('bcrypt');

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(value, 8);
};

const compare = async function (value, hashedValue) {
    const bcrypt = require('bcrypt');
    return bcrypt.compare(value, hashedValue);
};

const create404 = async function (message, throwError = false) {
    await this.createError(message, 404, throwError);
};

const create400 = async function (message, throwError = false) {
    await this.createError(message, 400, throwError);
};

const createError = async function (message, code, throwError) {
    const error = new Error(message);
    error.statusCode = code || 500;
    if (throwError)
        throw error;

    return error;
};

const createJWT = async function (payload) {
    const options = {
        algorithm: constants.JWT_ALGORITHM,
        expiresIn: 60 * 15//15 Minutes
    }
    //Create a Hashed key to provide as Secret
    const token = await jwt.sign(payload, constants.JWT_SECRET_KEY, options);
    return token;
};

const verifyJWT = async function (token) {
    const payload = jwt.verify(token, constants.JWT_SECRET_KEY);
    return payload;
};


module.exports = {
    parseDBError,
    getErrorObject,
    sendErrorResponse,
    hash,
    compare,
    create404,
    create400,
    createError,
    createJWT,
    verifyJWT
}
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
            code: error.code || 400
        };
    }
    catch (ex) {
        return {
            error: error,
            code: error.code || 500
        };
    }
};

const sendErrorResponse = function (error, response) {
    error = this.getErrorObject(error);
    response.status(error.code).send(error.error);
}

const hash = async function (value) {
    const bcrypt = require('bcrypt');

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(value, 8);
}

const compare = async function (value, hashedValue) {
    const bcrypt = require('bcrypt');
    return bcrypt.compare(value, hashedValue);
}


module.exports = {
    parseDBError,
    getErrorObject,
    sendErrorResponse,
    hash,
    compare
}
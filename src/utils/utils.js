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


module.exports = {
    parseDBError,
    getErrorObject,
    sendErrorResponse
}
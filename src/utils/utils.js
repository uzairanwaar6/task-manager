const parseDBError = function (error) {
    return Object.values(error.errors).map(item => {
        delete item.properties.reason
        return {
            field: item.path,
            properties: item.properties
        };
    });
};

const getErrorObject = function (error, code) {
    try {
        return {
            error: this.parseDBError(error),
            code: code
        };
    }
    catch (ex) {
        return {
            error: error,
            code: code
        };
    }


};


module.exports = {
    parseDBError,
    getErrorObject
}
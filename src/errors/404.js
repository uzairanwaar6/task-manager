class NotFoundError extends Error {
    constructor(message = 'not found') {
        super(message);
        this.name = 'NotFoundError';
    }

    get statusCode() {
        return 404;
    }
}

module.exports = NotFoundError;
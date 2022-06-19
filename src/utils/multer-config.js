const multer = require('multer');


const userAvatar = (fileName) => {
    return multer({
        dest: 'images/avatars',
        limits: {
            fileSize: 1 * 1024 * 1024//1MB
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error("invalid file format"))
            }
            return cb(undefined, true);
        }

    }).single(fileName);
};


module.exports = {
    userAvatar
};
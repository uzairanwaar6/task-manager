const multer = require('multer');


const userAvatar = (fileName) => {
    return multer({
        dest: 'images/avatar',
        preservePath: true
    }).single(fileName);
};


module.exports = {
    userAvatar
};
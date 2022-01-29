const utils = require('../utils/app_utils');

module.exports = async (req, res, next) => {
    try {
       const token = req.header('Authorization').replace('Bearer ','');
       const user = utils.verifyJWT(token);
       req.user = user;
       next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send('Unauthorized');
    }
};
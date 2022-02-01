const User = require('../models/userModel');
const utils = require('../utils/app_utils');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = await utils.verifyJWT(token);
        req.user = await User.findById(user.id);
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
};
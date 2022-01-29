module.exports = async (req, res, next) => {
    res.status(503).send('Our Application is in Maintinance Mode');
   // next();
};
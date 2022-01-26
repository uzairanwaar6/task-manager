const controller = require('../controllers/userController');
const utils = require('../utils/utils');

const routes = async function (app) {
    app.get('/users', async (req, res) => {
        try {
            const result = await controller.getAll();
            res.send(result);
        } catch (error) {
            res.status(error.code || 500).send(error.error);
        }
    });

    app.get('/users/:id', async (req, res) => {
        try {
            const result = await controller.getById(req.params.id);
            res.send(result);
        } catch (error) {
            utils.sendErrorResponse(error, res);
        }
    });

    app.post('/users', async (req, res) => {
        try {
            const result = await controller.add(req.body);
            res.send(result);
        } catch (error) {
            utils.sendErrorResponse(error, res);
        }
    });

    app.put('/users', async (req, res) => {
        try {
            const result = await controller.replace(req.body);
            res.send(result);
        } catch (error) {
            utils.sendErrorResponse(error, res);
        }
    });

    app.patch('/users', async (req, res) => {
        try {
            const result = await controller.update(req.body);
            res.send(result);
        } catch (error) {
            utils.sendErrorResponse(error, res);
        }
    });

    app.delete('/users/:id', async (req, res) => {
        try {
            const result = await controller.deleteById(req.params.id);
            res.send(result);
        } catch (error) {
            utils.sendErrorResponse(error, res);
        }
    });
};

module.exports = routes;
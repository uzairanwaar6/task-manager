const controller = require('../controllers/taskController');
const utils = require('../utils/utils');
const express = require('express');

const router = new express.Router();

router.get('/tasks', async (req, res) => {
    try {
        const result = await controller.getAll();
        res.send(result);
    } catch (error) {
        res.status(error.code || 500).send(error.error);
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const result = await controller.getById(req.params.id);
        if (!result)
            return res.status(404).send();
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.post('/tasks', async (req, res) => {
    try {
        const result = await controller.add(req.body);
        res.status(201).send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.put('/tasks', async (req, res) => {
    try {
        const result = await controller.replace(req.body);
        if (!result)
            return res.status(404).send();
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.patch('/tasks', async (req, res) => {
    try {
        const result = await controller.update(req.body);
        if (!result)
            return res.status(404).send();
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const result = await controller.deleteById(req.params.id);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});



module.exports = router;
const controller = require('../controllers/userController');
const utils = require('../utils/app_utils');
const express = require('express');

const router = new express.Router();

router.post('/users/register', async (req, res) => {
    try {
        const result = await controller.register(req.body);
        res.status(201).send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const result = await controller.login(req.body);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.get('/users', async (req, res) => {
    try {
        const result = await controller.getAll();
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const result = await controller.getById(req.params.id);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.post('/users', async (req, res) => {
    try {
        const result = await controller.add(req.body);
        res.status(201).send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.put('/users', async (req, res) => {
    try {
        const result = await controller.replace(req.body);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.patch('/users', async (req, res) => {
    try {
        const result = await controller.update(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
        utils.sendErrorResponse(error, res);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const result = await controller.deleteById(req.params.id);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

module.exports = router;
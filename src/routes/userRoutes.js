const controller = require('../controllers/userController');
const utils = require('../utils/app_utils');
const multerConfig = require('../utils/multer-config');
const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('multer');

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

router.get('/users/logout', auth, async (req, res) => {
    try {
        const result = await controller.logout(req.user);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.get('/users/logout-all', auth, async (req, res) => {
    try {
        const result = await controller.logoutAll(req.user);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});


router.get('/users', auth, async (req, res) => {
    try {
        const result = await controller.getAll();
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.get('/users/me', auth, async (req, res) => {
    try {
        const result = await controller.getById(req.user.id);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.post('/users', auth, async (req, res) => {
    try {
        const result = await controller.add(req.body);
        res.status(201).send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.put('/users', auth, async (req, res) => {
    try {
        const result = await controller.replace(req.body);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.patch('/users', auth, async (req, res) => {
    try {
        const result = await controller.update(req.body);
        res.send(result);
    } catch (error) {
        console.log(error);
        utils.sendErrorResponse(error, res);
    }
});

router.delete('/users', auth, async (req, res) => {
    try {
        const result = await controller.deleteById(req.user.id);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

router.post('/users/me/avatar', multerConfig.userAvatar('avatar'), async (req, res) => {
    try {
        return res.send();
        const result = await controller.deleteById(req.user.id);
        res.send(result);
    } catch (error) {
        utils.sendErrorResponse(error, res);
    }
});

module.exports = router;
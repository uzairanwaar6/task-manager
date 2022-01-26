const db = require('../db/database');
const utils = require('../utils/utils');
const Task = require('../models/taskModel');

db.connect();


const getAll = async function () {
    try {
        const result = await Task.find({});
        return result;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};


const getById = async function (id) {
    try {
        const result = await Task.findById(id);
        return result;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const add = async function (user) {
    try {
        const model = await new Task(user).save();
        return model;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const replace = async function (user) {
    try {
        const result = await Task.findByIdAndUpdate({ "_id": user.id },
            user,
            {
                "runValidators": true,
                "new": true
            });
        return result;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const update = async function (user) {
    try {
        let userModel = await Task.findById(user.id);
        userModel = { ...user };

        const result = await Task.findByIdAndUpdate({ "_id": user.id },
            userModel,
            {
                "runValidators": true,
                "new": true
            });
        return result;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const deleteById = async function (id) {
    try {
        const result = await Task.findByIdAndDelete(id);
        return result;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};


module.exports = {
    add,
    getById,
    getAll,
    replace,
    update,
    deleteById
};
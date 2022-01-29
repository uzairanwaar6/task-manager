const db = require('../db/database');
const utils = require('../utils/app_utils');
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

const add = async function (task) {
    try {
        const model = await new Task(task).save();
        return model;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const replace = async function (task) {
    try {
        let model = await Task.findById(task.id);
        model = new Task({ ...model, ...task });
        await model.save();

        return model;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const update = async function (task) {
    try {
        let model = await Task.findById(task.id);
        Object.keys(task).forEach(item => {
            model[item] = task[item];
        });

        await model.save();
        return model;
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
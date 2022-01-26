const db = require('../db/database');
const utils = require('../utils/utils');
const Task = require('../models/taskModel');

db.connect();


const getAll = function () {
    return new Promise((resolve, reject) => {
        try {
            Task.find({})
                .then(result => resolve(result))
                .catch(error => reject(utils.getErrorObject(error, 400)));
        }
        catch (error) {
            reject(utils.getErrorObject(error, 500));
        }
    });
};


const getById = function (id) {
    return new Promise((resolve, reject) => {
        try {
            Task.findById(id)
                .then(result => resolve(result))
                .catch(error => reject(utils.getErrorObject(error, 400)));
        }
        catch (error) {
            reject(utils.getErrorObject(error, 500));
        }
    });
};

const add = function (task) {
    return new Promise((resolve, reject) => {
        try {
            new Task(task)
                .save()
                .then(result => resolve(result))
                .catch(error => reject(utils.getErrorObject(error, 400)));
        }
        catch (error) {
            reject(utils.getErrorObject(error, 500));
        }
    });

};

const replace = function (user) {
    return new Promise((resolve, reject) => {
        try {
            Task.findByIdAndUpdate({ "_id": user.id },
                user,
                {
                    "runValidators": true,
                    "new": true
                })
                .then(result => resolve(result))
                .catch(error => reject(utils.getErrorObject(error, 400)));
        }
        catch (error) {
            reject(utils.getErrorObject(error, 500));
        }
    });
};

const update = function (user) {
    return new Promise(async (resolve, reject) => {
        try {
            let userModel = await Task.findById(user.id);
            userModel = { ...user };

            Task.findByIdAndUpdate({ "_id": user.id },
                userModel,
                {
                    "runValidators": true,
                    "new": true
                })
                .then(result => resolve(result))
                .catch(error => reject(utils.getErrorObject(error, 400)));
        }
        catch (error) {
            console.log(error);
            reject(utils.getErrorObject(error, 500));
        }
    });
};

const deleteById = function (id) {
    return new Promise((resolve, reject) => {
        try {
            Task.findByIdAndDelete(id)
                .then(result => resolve(result))
                .catch(error => reject(utils.getErrorObject(error, 400)));
        }
        catch (error) {
            reject(utils.getErrorObject(error, 500));
        }
    });
};

module.exports = {
    add,
    getById,
    getAll,
    replace,
    update,
    deleteById
};
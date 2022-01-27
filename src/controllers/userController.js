const db = require('../db/database');
const utils = require('../utils/utils');
const User = require('../models/userModel');

db.connect();


const getAll = async function () {
    try {
        const result = await User.find({});
        return result;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};


const getById = async function (id) {
    try {
        const result = await User.findById(id);
        return result;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const add = async function (user) {
    try {
        const model = await new User(user).save();
        return model;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const replace = async function (user) {
    try {
        let userModel = await User.findById(user.id);
        user = new User({ ...userModel, ...user });
        await user.save();

        return user;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const update = async function (user) {
    try {
        let userModel = await User.findById(user.id);
        Object.keys(user).forEach(item => {
            userModel[item] = user[item];
        });

        await userModel.save();
        return userModel;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const deleteById = async function (id) {
    try {
        const result = await User.findByIdAndDelete(id);
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
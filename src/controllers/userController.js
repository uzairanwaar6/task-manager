const db = require('../db/database');
const utils = require('../utils/app_utils');
const User = require('../models/userModel');
const NotFoundError = require('../errors/404');

db.connect();

const register = async function (user) {
    try {
        await this.add(user);

        const loggedIn = await this.login({
            username: user.username,
            password: user.password
        });
        return loggedIn;
    } catch (error) {
        throw error;
    }
};

const login = async function (user) {
    try {
        const keys = Object.keys(user);
        const isValid = ['username', 'password'].every((key) => keys.includes(key));

        if (!isValid)
            await utils.create400('Invalid Request', true);

        const result = await User.findOne({
            username: user.username
        });

        if (!result) {
            await utils.create404('User not found', true);
        }
        const verified = await User.verifyPassword(user.password, result.password);
        if (!verified)
            await utils.create400('Invalid Credentials', true);

        const token = await result.createToken();
        return { result, token };
    } catch (error) {
        throw error;
    }
};

const logout = async function (user) {
    try {
        user.tokens = user.tokens.filter((item) => item.token !== user.token);
        user.save();
        return true;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

const logoutAll = async function (user) {
    try {
        user.tokens = [];
        user.save();
        return true;
    } catch (error) {
        error.code = 400;
        throw error;
    }
};

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
        if (!userModel) {
            throw new NotFoundError('User not found');
        }

        Object.keys(user).forEach(item => {
            userModel[item] = user[item];
        });

        await userModel.save();
        return userModel;
    } catch (error) {
        if (!error.statusCode)
            error.statusCode = 400;

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
    deleteById,
    login,
    logout,
    logoutAll,
    register
};
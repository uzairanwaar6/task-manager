const chalk = require('chalk');
const express = require('express');
const server = require('./server')
const userRoutes = require('./routes/user');

const app = express();

userRoutes(app);
server.configure(app);
server.start(app);



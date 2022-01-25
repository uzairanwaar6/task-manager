const chalk = require('chalk');
const express = require('express');
const server = require('./server')
const userRoutes = require('./routes/userRoutes');

const app = express();
server.configure(app);

userRoutes(app);
server.start(app);



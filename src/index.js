const chalk = require('chalk');
const express = require('express');
const server = require('./server')
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
server.configure(app);

userRoutes(app);
taskRoutes(app);
server.start(app);



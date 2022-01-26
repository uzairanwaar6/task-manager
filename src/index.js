const express = require('express');
const server = require('./server')
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');

const app = express();
server.configure(app);

app.use(userRouter);
app.use(taskRouter);

server.start(app);



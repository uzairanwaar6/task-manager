const express = require('express');
const server = require('./server')
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const auth = require('./middlewares/auth');
const maintinance = require('./middlewares/maintinance');
const logging = require('./middlewares/logging');

const app = express();
server.configure(app);

//app.use(logging);
//app.use(maintinance);
//app.use(auth);
app.use(userRouter);
app.use(taskRouter);

server.start(app);



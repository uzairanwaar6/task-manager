const mongose = require('mongoose');
const { Task } = require('../models/taskModel');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager-api';
const connectionString = `${connectionURL}/${dbName}`;

mongose.connect(connectionString, {
    useNewUrlParser: true,
    // useCreateIndex: true
});

const task = new Task({
    name: 'Cleaning',
    description: 'This task is about cleaning the house. You must know about how to perform cleaning.',
    createdBy:'uzairanwaar@email.com',
    password: 'the pass value',

});



task.save()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(Object.values(error.errors).map(item => {
            delete item.properties.reason
            return {
                field: item.path,
                properties: item.properties
            };
        }));
    });
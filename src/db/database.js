const dbPort = 27017;
const connectionURL = 'mongodb://127.0.0.1:' + dbPort;
const dbName = 'task-manager';
const connectionString = `${connectionURL}/${dbName}`;



const connect = function () {
    const mongose = require('mongoose');

    mongose.connect(connectionString, {
        autoIndex: true
    });
};

module.exports = {
    connect
};

// const task = new Task({
//     name: 'Cleaning',
//     description: 'This task is about cleaning the house. You must know about how to perform cleaning.',
//     createdBy:'uzairanwaar@email.com',
//     password: 'the pass value',

// });



// task.save()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(Object.values(error.errors).map(item => {
//             delete item.properties.reason
//             return {
//                 field: item.path,
//                 properties: item.properties
//             };
//         }));
//     });
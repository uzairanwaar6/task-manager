const mongoDB = require('mongodb');
const chalk = require('chalk');

const MONGO_CLIENT = mongoDB.MongoClient;
const connectionURL = 'mongodb://localhost:27017';
const database = 'task-manager';

MONGO_CLIENT.connect(connectionURL, (error, client) => {
    if (error)
        return console.error(chalk.red.bold(`Could not connect to the Database\n${error}`));

    console.log(chalk.bold.yellow(`Successfully connected to the Mongo DB Server...`));
});

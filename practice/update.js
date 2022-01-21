const mongoDB = require('mongodb');
const chalk = require('chalk');

const MONGO_CLIENT = mongoDB.MongoClient;
const connectionURL = 'mongodb://localhost:27017';
const database = 'task-manager';
const collection = 'users';


MONGO_CLIENT.connect(connectionURL, (error, client) => {
    if (error)
        return console.error(chalk.red.bold(`Somthing went wrong. Could not connect to the Database\n${error}`));

    console.log(chalk.bold.blue(`Successfully connected to the Mongo DB Server...`));

    const db = client.db(database);
    const dbCollection = db.collection(collection);

    dbCollection.updateMany({
        firstName: {
            $in: ['Uzair']
        },
        age: {
            $eq: 35
        }
    }, {
        $set: {
            firstName: 'Uzair',
            age: 34
        }
    })
        .then((resolve) => {
            console.log(chalk.bold.green(`Records has been updated!`));
            console.log(resolve)
        })
        .catch((reject) => {
            console.log(`Error! ${reject}`);
        });

});

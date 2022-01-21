const mongoDB = require('mongodb');
const chalk = require('chalk');

const MONGO_CLIENT = mongoDB.MongoClient;
const connectionURL = 'mongodb://localhost:27017';
const database = 'task-manager';
const collection = 'users';


MONGO_CLIENT.connect(connectionURL, async (error, client) => {
    if (error)
        return console.error(chalk.red.bold(`Somthing went wrong. Could not connect to the Database\n${error}`));

    console.log(chalk.bold.blue(`Successfully connected to the Mongo DB Server...`));

    const db = client.db(database);
    const dbCollection = db.collection(collection);

    const updatePromise = await dbCollection.deleteMany({
        age: {
            $eq: 34
        }
    });

    console.log(updatePromise);

});

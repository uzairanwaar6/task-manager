const mongoDB = require('mongodb');
const chalk = require('chalk');

const MONGO_CLIENT = mongoDB.MongoClient;
const connectionURL = 'mongodb://localhost:27017';
const database = 'task-manager';
const collection = 'users';
const data = [
    {
        firstName: 'Uzair',
        lastName: 'Anwaar',
        age: 34,
        address: 'Dehli Colony',
        city: 'Karach',
        occupation: 'Software Engineering',
        description: 'He is the eldest in the family.'
    },
    {
        firstName: 'Umair',
        lastName: 'Anwaar',
        age: 31,
        address: 'Dehli Colony',
        city: 'Karach',
        occupation: 'Software Engineering',
        description: 'He is at third number in the family.'
    },
    {
        firstName: 'Ubaid',
        lastName: 'Anwaar',
        age: 30,
        address: 'Dehli Colony',
        city: 'Karach',
        occupation: 'Manufacturing',
        description: 'He is the yonger in the family.'
    }
];

MONGO_CLIENT.connect(connectionURL, async (error, client) => {
    if (error)
        return console.error(chalk.red.bold(`Somthing went wrong. Could not connect to the Database\n${error}`));

    console.log(chalk.bold.blue(`Successfully connected to the Mongo DB Server...`));

    const db = client.db(database);
    const dbCollection = db.collection(collection);

    dbCollection.insertMany(data, (error, result) => {
        if (error)
            return console.log(chalk.bold.red(error));

        console.log(chalk.green('Documents successfully inserted'));

        console.log(Object.values(result.insertedIds).map(id => id));
        dbCollection.findOne({
            _id: Object.values(result.insertedIds).map(id => id)[0]
        },
            (error, innerResult) => {

                if (error)
                    return console.log(chalk.bold.red(error));

                console.log(innerResult);
            });

    });
});

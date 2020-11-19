// CRUD 
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'taskApp'

mongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database');
    } else {
        const db = client.db(dbName);
        db.collection('users').insertOne({
            name: 'Arman Asif',
            age: 25
        }, (error, result) => {
            if (error) {
                console.log('Unable to insert user');
            } else {
                console.log(result.ops);
            }
        })
    }
})

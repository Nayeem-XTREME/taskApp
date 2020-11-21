// CRUD 
// Deconstructing
const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'taskApp'

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database');
    } else {
        const db = client.db(dbName);

        // Using Promise
        db.collection('users').deleteMany({
            age: 27
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

    }
})

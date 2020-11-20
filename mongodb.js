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

        // Using callback
        // db.collection('users').updateOne({
        //     _id: new ObjectID('5fb6bc9a95d9f10d1472d020')
        // }, {
        //     $set: {
        //         name: 'Bakar Siddik (ABS)'
        //     }
        // }, (error, res) => {
        //     if (error) {
        //         console.log('Unable to update!');
        //     } else {
        //         console.log(res);
        //     }
        // })

        // Using Promise
        db.collection('users').updateOne({
            _id: new ObjectID('5fb6bc9a95d9f10d1472d020')
        }, {
            $set: {
                name: 'Abu Bakar Siddik'
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })

    }
})

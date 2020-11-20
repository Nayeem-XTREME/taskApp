// CRUD 
// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// Deconstructing
const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'taskApp'

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to database');
    } else {
        const db = client.db(dbName);
        
        // db.collection('users').findOne({_id: new ObjectID('5fb6be958740b11ca890cb42')}, (error, result) => {
        //     if (error) {
        //         console.log('Unable to fetch');
        //     } else {
        //         console.log(result);
        //     }
        // })

        // 'find' returns a 'Cursor'
        db.collection('users').find({ age: 25 }).toArray((err, res) => {
            if (err) {
                console.log('Unable to fetch');
            } else {
                console.log(res);
            }
        })

        db.collection('users').find({ age: 25 }).count((err, res) => {
            if (err) {
                console.log('Unable to fetch');
            } else {
                console.log(res);
            }
        })

    }
})

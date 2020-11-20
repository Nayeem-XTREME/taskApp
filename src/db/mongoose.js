const mongoose = require('mongoose');

// Same as mongodb, but only the database name is appended after the url -> task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// User model
const User = mongoose.model('User', {
    name: {
        type: String,
    }, 
    age: {
        type: Number
    }
})

// Create a new user
const me = new User({
    name: 'Niaz Morshed',
    age: 25
})

// Save into database
me.save()
.then(() => console.log(me))
.catch(err => console.log(err))
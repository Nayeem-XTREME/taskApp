const mongoose = require('mongoose');
const validator = require('validator');

// Same as mongodb, but only the database name is appended after the url -> task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// User model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be positive')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email address!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Password can't contain the word 'password'!`);
            }
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// Create a new user
const me = new User({
    name: 'Nayeem',
    email: 'nayeem@gMail.com ',
    password: 'NayeemNiazMorshed'
});

// Save into database
me.save()
.then(() => console.log(me))
.catch(err => console.log(err));

const task = new Task({
    description: 'Cleaning garder'
})

task.save()
.then(() => console.log(task))
.catch(err => console.log(err));
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
    }
})

// Create a new user
const me = new User({
    name: 'Nayeem',
    email: 'nayeem@gMail.com '
})

// Save into database
me.save()
.then(() => console.log(me))
.catch(err => console.log(err))
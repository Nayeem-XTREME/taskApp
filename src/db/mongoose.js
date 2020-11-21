const mongoose = require('mongoose');

// Same as mongodb, but only the database name is appended after the url -> task-manager-api
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

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
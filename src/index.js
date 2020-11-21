const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

const json = express.json();
app.use(json);

// GET
app.get('/user', (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
})

app.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if (!user) {
            res.status(404).send();
        } else {
            res.send(user);
        }
    })
    .catch(err => res.send(err));
})

// POST
app.post('/user', (req, res) => {
    const user = new User(req.body);

    user.save()
    .then(() => res.status(201).send(user))
    .catch(err => res.status(400).send(err));
})

app.post('/task', (req, res) => {
    const task = new Task(req.body);

    task.save()
    .then(() => res.status(201).send(task))
    .catch(err => res.status(400).send(err));
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
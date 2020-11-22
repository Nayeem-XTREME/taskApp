const express = require('express');
const User = require('./models/user');
const Task = require('./models/task');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3000;

const json = express.json();
app.use(json);

// GETS
app.get('/user', async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }

})

app.get('/user/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user)
            res.status(404).send();
        else
            res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }

})

app.get('/task', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error)
    }

})

app.get('/task/:id', async (req, res) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task)
            res.status(404).send();
        else 
            res.send(task);
    } catch (error) {
        res.status(500).send(error)
    }

})

// POSTS
app.post('/user', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }

})

app.post('/task', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }

})

// UPDATES
app.patch('/user/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every((x) => {
        return allowedUpdates.includes(x);
    })

    if (!isValid) {
        res.status(400).send({ error: 'Invalid updates' });
    } else {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
            if (!user) {
                res.status(404).send();
            } else {
                res.send(user);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

})

app.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = updates.every((x) => {
        return allowedUpdates.includes(x);
    })

    if (!isValid) {
        res.status(400).send({ error: 'Invalid updates' });
    } else {
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
            if (!task) {
                res.status(404).send();
            } else {
                res.send(task);
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }
})

// DELETE
app.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) {
            res.status(404).send();
        } else {
            res.send(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) {
            res.status(404).send();
        } else {
            res.send(task);
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
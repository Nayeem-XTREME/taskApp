const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.get('/task', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error)
    }

})

router.get('/task/:id', async (req, res) => {

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

router.post('/task', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }

})

router.patch('/task/:id', async (req, res) => {
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

router.delete('/task/:id', async (req, res) => {
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

module.exports = router;
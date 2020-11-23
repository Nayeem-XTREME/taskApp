const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// GETS
router.get('/user', async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }

})

router.get('/user/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user)
            res.status(404).send('No user found!');
        else
            res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }

})

// POSTS
router.post('/user', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }

})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
})

// UPDATES
router.patch('/user/:id', async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every((x) => {
        return allowedUpdates.includes(x);
    })

    if (!isValid) {
        res.status(400).send({ error: 'Invalid updates' });
    } else {
        try {
            // Simple adjastment so that the Middleware works
            const user = await User.findById(req.params.id);
            updates.forEach(x => user[x] = req.body[x]);
            await user.save();

            // Removing this line because, Middleware won't work for 'fidByIdAndUpdate' method!
            // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
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

// DELETE
router.delete('/user/:id', async (req, res) => {
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

module.exports = router;
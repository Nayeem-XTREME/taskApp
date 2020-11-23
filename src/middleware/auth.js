// 'auth' Middleware
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');   // Discarding 'Bearer' part from the string
        const decoded = jwt.verify(token, 'mysecrettoken');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

        if (!user) {
            throw new Error();
        }

        // Just pass the user we found here, no need to fetch again in Router!
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;
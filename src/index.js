const express = require('express');
const User = require('./models/user')
require('./db/mongoose')

const app = express();
const port = process.env.PORT || 3000;

const json = express.json();
app.use(json);

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
    .then(() => res.status(200).send(user))
    .catch(err => res.status(400).send(err));
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
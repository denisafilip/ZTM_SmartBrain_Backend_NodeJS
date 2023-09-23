const express = require('express');
const cors = require('cors');
const { Database, User } = require('./database.js');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const app = express()

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    User.find()
        .then(users => res.send(users))
        .catch(error => res.status(500).send('Error retrieving users from database'));
});

// Sign In
app.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                res.json(user);
            } else {
                res.status(400).json('Wrong credentials');
            }
        })
        .catch(err => {
            res.status(400).json('Error signing in');
        });
});

// Register
app.post('/register', (req, res) => {
    const {email, name, password} = req.body;

    const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, salt),
        entries: 0
    });

    newUser.save()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(400).json('Error registering user');
        });
});

// Profile
app.get('/profile/:id', (req, res) => {
   const { id } = req.params;

    User.findById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json('User not found');
            }
        })
        .catch(err => {
            res.status(400).json('Error fetching profile');
        });
});

// Image
app.put('/image', (req, res) => {
    const { id } = req.body;

    User.findByIdAndUpdate(id, { $inc: { entries: 1 } }, { new: true })
        .then(user => {
            if (user) {
                res.json(user.entries);
            } else {
                res.status(404).json('User not found');
            }
        })
        .catch(err => {
            res.status(400).json('Error updating entries');
        });
});

app.listen(8080, () => {
    console.log('app is running on port 8080');
});



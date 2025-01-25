const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const collection = require('./config');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.post('/signup', async (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password,
    }

    const existingUser = await collection.findOne({username: data.username});

    if (existingUser) {
        res.send("User already exist");
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render('home', {username: data.username});
    }
})

app.post('/login', async (req, res) => {

    try {
        const check = await collection.findOne({username: req.body.username});
        if (!check) {
            res.send("User not found");
        }

        const comparePassword = await bcrypt.compare(req.body.password, check.password);
        if (!comparePassword) {
            res.send("Wrong Password");
        } else {
            res.render('home', {username: check.username})
        }
    }
    catch (error) {
        console.log(error);
        res.send("Wrong details");
    }
})

const port = 3241
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
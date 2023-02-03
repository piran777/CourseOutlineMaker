const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./Authentication/userModel');

const app = express();
const PORT = 4200;
const authController = require('./Authentication/authController');
var whiteList = ['http://localhost:' + PORT, 'http://localhost:3000'];
var corsOptions = { 
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
    }, 
    optionsSuccessStatus: 200,
    credentials: true
}

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:AOhNpaBRe1MTRGLT@cluster0.yzv6cv1.mongodb.net/test");
const database = mongoose.connection
database.on('error', (error) => { console.log(error) })
database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Outline endpoints
app.post('/outline', (req, res) => {
    database.collection("outline").insertOne(req.body, function (error, data) {
        res.send((data ? data : error));
    });
});

app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.get('/logout', authController.logout);


//Check if JWT exists & is verified
app.get('/requireauth', (req, res) => {
    const token = req.cookies.jwt;

    //Check if JWT exists & is verified
    if(token) {
        jwt.verify(token, 'Course Outlines Secret', (err, decodedToken) => {
            if(err) {
                res.status(400).send("Invalid");
            } else {
                res.status(200).send("Pass");
            }
        });
    } else {
        res.status(400).send("Invalid");
    }
});

//Check Current User
app.get('/checkuser', (req, res) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'Course Outlines Secret', async (err, decodedToken) => {
            if(err) {
                res.status(400).send("Invalid");
            } else {
                let user = await User.findById(decodedToken.id)
                res.status(200).send(user);
            }
        });
    } else {
        res.status(400).send("Invalid");

    }
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

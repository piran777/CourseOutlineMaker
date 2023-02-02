const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
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

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

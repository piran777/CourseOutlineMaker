const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const pdf = require('html-pdf');
const pdfTemplate = require('./documents/App');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./Authentication/userModel');


const app = express();
const PORT = 4200;
var corsOptions = { origin: 'http://localhost:' + PORT, optionsSuccessStatus: 200, credentials: true };
const authController = require('./Authentication/authController');

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://admin:AOhNpaBRe1MTRGLT@cluster0.yzv6cv1.mongodb.net/test");
const database = mongoose.connection
database.on('error', (error) => { console.log(error) })
database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Outline endpoints
app.post('/outline', (req, res) => {
    database.collection("outline").insertOne(req.body, function (error, data) {
        res.send((data ? data : error));
    });
});


app.get('/outlineLoader/:value', (req, res) => {
    const { value } = req.params;
    database.collection('outline').find({ value }).toArray((error, data) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  });


//post - pdf generation and fetch
app.post('/create-pdf', (req,res) => {
pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err)=>{
    if(err){
        res.send(Promise.reject());
    }
    database.collection("outline").insertOne(req.body, function (error, data) {
        res.send(Promise.resolve() && (data ? data : error));
    });
    
})


});

//get - send pdf to client
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})


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

const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const pdf = require('html-pdf');
const pdfTemplate = require('./documents/App');
const mongoose = require('mongoose');
const app = express();
const PORT = 4200;
var corsOptions = { origin: 'http://localhost:' + PORT, optionsSuccessStatus: 200 }

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

// Outline endpoints
app.post('/outline', (req, res) => {
    database.collection("outline").insertOne(req.body, function (error, data) {
        res.send((data ? data : error));
    });
});


//post - pdf generation and fetch
app.post('/create-pdf', (req,res) => {
pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err)=>{
    if(err){
        res.send(Promise.reject());
    }
     res.send(Promise.resolve());
})

});

//get - send pdf to client
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})


app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

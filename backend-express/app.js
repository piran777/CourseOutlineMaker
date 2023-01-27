const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const app = express();
const PORT = 4200;

var corsOptions = {
    origin: 'http://localhost:' + PORT,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.post('/', (req, res) => {
    const { name } = req.body;

    res.send(`Welcome ${name}`);
})

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

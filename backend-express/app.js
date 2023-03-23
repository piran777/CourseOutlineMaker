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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Outline endpoints
app.post('/outline', (req, res) => {
    database.collection("outline").insertOne(req.body, function (error, data) {
        res.send((data ? data : error));
    });
});

app.post('/outline/approve', (req, res) => {
    // Delete by id from non approved, then add to approved list
    database.collection("non-approved-outlines").deleteOne({_id: mongoose.Types.ObjectId(req.body.data._id)}, function (error, data) {
        delete req.body.data._id;
        database.collection("outline").insertOne(req.body.data, function (error, data) {
            res.send((data ? data : error));
        });
    });
});

app.post('/outline/disapprove', (req, res) => {
    // Delete by id from non approved, then add to disapproved list
    database.collection("non-approved-outlines").deleteOne({_id: mongoose.Types.ObjectId(req.body.data._id)}, function (error, data) {
        delete req.body.data._id;
        database.collection("reviewed-outlines").insertOne(req.body.data, function (error, data) {
            res.send((data ? data : error));
        });
    });
});

/*app.get('/getOutline/:value', (req, res) => {
    const name = req.params.value;
    database.collection("outline").find({ value: name }).toArray(function (error, data) {
        res.send((data ? data : error));
    });
});*/

app.get('/getPdfNames', (req, res) => {
    database.collection('outline').find({}).toArray((error, data) => {
        if (error) {
            res.send(error);
        } else {
            const pdfNames = data.map(pdf => pdf.value);
            res.send(pdfNames);
        }
    });
});


app.get('/getOutline/:value', (req, res) => {
    const name = req.params.value;
    database.collection("outline").find({ value: name }).toArray(function (error, data) {
        if (error) {
            res.send(error);
        } else {
            let outlineData = data.map(function (d) {
                return {
                    code: d.code,
                    course: d.course,
                    year: d.year,
                    desc: d.desc,
                    instructor: d.instructor,
                    calendar: d.calendar,
                    contact: d.contact,
                    hours: d.hours,
                    labhours: d.labhours,
                    anti: d.anti,
                    pre: d.pre,
                    co: d.co,
                    CEAB: d.CEAB,
                    nameDes: d.nameDes,
                    reqText: d.reqText,
                    reqRef: d.reqRef,
                    recRef: d.recRef,
                    knowledge: d.knowledge,
                    engTools: d.engTools,
                    impact: d.impact,
                    probAnaly: d.probAnaly,
                    teamWork: d.teamWork,
                    ethics: d.ethics,
                    investigation: d.investigation,
                    comSkills: d.comSkills,
                    economics: d.economics,
                    design: d.design,
                    professional: d.professional,
                    learning: d.learning,
                    topic1: d.topic1,
                    a: d.a,
                    b: d.b,
                    topic2: d.topic2,
                    a2: d.a2,
                    b2: d.b2,
                    topic3: d.topic3,
                    a3: d.a3,
                    b3: d.b3,
                    hwAssign: d.hwAssign,
                    quizzes: d.quizzes,
                    lab: d.lab,
                    midterm: d.midterm,
                    hwAssign2: d.hwAssign2,
                    quizzes2: d.quizzes2,
                    labora2: d.labora2,
                    midterm2: d.midterm2,
                    submission: d.submission,
                    locker: d.locker,
                    devices: d.devices,
                    clickers: d.clickers,
                    outlineName: d.outlineName,

                };
            });
            res.send(outlineData);
        }
    });
});


app.post('/updatePDF/:value', (req, res) => {
    const name = req.params.value;
    const updatedData = req.body;
    database.collection("outline").updateOne({ value: name }, { $set: updatedData }, function (error, result) {
        if (error) {
            res.send({
                message: "Error updating document",
                error: error
            });
        } else {
            res.send({
                message: "Document updated successfully"
            });
        }
    });
});


app.get('/outlineLoader/:value', (req, res) => {
    const { value } = req.params;
    database.collection('outline').find({ value }).toArray((error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.json(data);
        }
    });
});

app.get('/unapproved-outlineLoader/:value', (req, res) => {
    const { value } = req.params;
    database.collection('non-approved-outlines').find({ value }).toArray((error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            res.json(data);
        }
    });
});



//post - pdf generation and fetch
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        req.body.timestamp = new Date().toISOString();
        database.collection("outline").insertOne(req.body, function (error, data) {
            res.send(Promise.resolve() && (data ? data : error));
        });

    })


});


app.post('/create-non-approved-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        req.body.timestamp = new Date().toISOString();
        database.collection("non-approved-outlines").insertOne(req.body, function (error, data) {
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
    if (token) {
        jwt.verify(token, 'Course Outlines Secret', (err, decodedToken) => {
            if (err) {
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

    if (token) {
        jwt.verify(token, 'Course Outlines Secret', async (err, decodedToken) => {
            if (err) {
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

// Instructors
app.get('/instructors', (req, res) => {
    const authDb = mongoose.connection.useDb('auth');
    authDb.collection("users").find({ position: "instructor" }).toArray(function (error, data) {
        res.send((data ? data : error));
    });
});
app.post('/instructors', (req, res) => {
    database.collection("instructors").insertOne(req.body, function (error, data) {
        res.send(Promise.resolve() && (data ? data : error));
    });
});
app.get('/instructors/assigned', (req, res) => {
    database.collection("instructors").find().toArray(function (error, data) {
        res.send((data ? data : error));
    });
});

// Non-approved Data
app.get('/non-approved', (req, res) => {
    database.collection("non-approved-outlines").find().toArray(function (error, data) {
        res.send((data ? data : error));
    });
});

app.post('/non-approved', (req, res) => {
    database.collection("non-approved-outlines").insertOne(req.body, function (error, data) {
        res.send(Promise.resolve() && (data ? data : error));
    });
});

// New Outline Notifications

// used by instructor homepage
app.get('/new-outline/:fName/:lName', (req, res) => {

    let firstName = req.params.fName;
    let lastName = req.params.lName;

    database.collection("new-assigned-outlines").find({fName: firstName, lName: lastName}).toArray(function (error, data) {
        res.send((data ? data : error));
    });
});

// Used by assign-instructor
app.post('/new-outline', (req, res) => {
    database.collection("new-assigned-outlines").insertOne(req.body, function (error, data) {
        res.send(Promise.resolve() && (data ? data : error));
    });
});

app.delete('/new-outline/:outline', (req, res) => {

    let instructorOutline = req.params.outline;

    database.collection("new-assigned-outlines").deleteOne({name: instructorOutline}, (err, result) => {
        if (err) throw err;
        console.log(`Deleted ${result.deletedCount} document(s) with name: ${instructorOutline}`);
        res.send(`Deleted ${result.deletedCount} document(s) with course: ${instructorOutline}`);
    });
})

/*
app.post('/outline/approve', (req, res) => {
    // Delete by id from non approved, then add to approved list
    database.collection("non-approved-outlines").deleteOne({_id: mongoose.Types.ObjectId(req.body.data._id)}, function (error, data) {
        delete req.body.data._id;
        database.collection("outline").insertOne(req.body.data, function (error, data) {
            res.send((data ? data : error));
        });
    });
});*/

app.get('/getNonApprovedPdfNames', (req, res) => {
    database.collection('non-approved-outlines').find({}).toArray((error, data) => {
        if (error) {
            res.send(error);
        } else {
            const pdfNames = data.map(pdf => pdf.value);
            res.send(pdfNames);
        }
    });
});

app.get('/getNonApprovedOutline/:value', (req, res) => {
    const name = req.params.value;
    database.collection("non-approved-outlines").find({ value: name }).toArray(function (error, data) {
        if (error) {
            res.send(error);
        } else {
            let outlineData = data.map(function (d) {
                return {
                    code: d.code,
                    course: d.course,
                    year: d.year,
                    desc: d.desc,
                    instructor: d.instructor,
                    calendar: d.calendar,
                    contact: d.contact,
                    hours: d.hours,
                    labhours: d.labhours,
                    anti: d.anti,
                    pre: d.pre,
                    co: d.co,
                    CEAB: d.CEAB,
                    nameDes: d.nameDes,
                    reqText: d.reqText,
                    reqRef: d.reqRef,
                    recRef: d.recRef,
                    knowledge: d.knowledge,
                    engTools: d.engTools,
                    impact: d.impact,
                    probAnaly: d.probAnaly,
                    teamWork: d.teamWork,
                    ethics: d.ethics,
                    investigation: d.investigation,
                    comSkills: d.comSkills,
                    economics: d.economics,
                    design: d.design,
                    professional: d.professional,
                    learning: d.learning,
                    topic1: d.topic1,
                    a: d.a,
                    b: d.b,
                    topic2: d.topic2,
                    a2: d.a2,
                    b2: d.b2,
                    topic3: d.topic3,
                    a3: d.a3,
                    b3: d.b3,
                    hwAssign: d.hwAssign,
                    quizzes: d.quizzes,
                    lab: d.lab,
                    midterm: d.midterm,
                    hwAssign2: d.hwAssign2,
                    quizzes2: d.quizzes2,
                    labora2: d.labora2,
                    midterm2: d.midterm2,
                    submission: d.submission,
                    locker: d.locker,
                    devices: d.devices,
                    clickers: d.clickers,
                    outlineName: d.outlineName,
                    justifyChange: d.JustifyChange,
                    _id: d._id,
                };
            });
            res.send(outlineData);
        }
    });
});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

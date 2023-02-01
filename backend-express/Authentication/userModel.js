const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your First Name'],
        lowercase: true
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your Last Name'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
});

const auth = mongoose.connection.useDb('auth');

const UserInfo = auth.model('user', userSchema);

module.exports = UserInfo;
const UserInfo = require('./userModel');
const jwt = require('jsonwebtoken');

//Handle Errors
const handleErrors = (err) => {
    let errors = { firstName: '', lastName: '', email: '', password: '' };

    //Duplicate Email Error Code
    if(err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    //Validation Errors
    if(err.message.includes('user validation failed')) {
        (Object.values(err.errors)).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 7 * 24 * 60 * 60;

//Creates JSON Web Tokens
const createToken = (id) => {
    return jwt.sign({ id }, 'Course Outlines Secret', {
        expiresIn: maxAge
    });
}

module.exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const userInfo = await UserInfo.create({ firstName, lastName, email, password });
        const token = createToken(userInfo._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: userInfo._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserInfo.login(email, password);

        res.status(200).json({ user: user._id })
    } catch (err) {
        res.status(400).json({});
    }
}
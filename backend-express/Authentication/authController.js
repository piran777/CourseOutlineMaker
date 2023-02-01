const UserInfo = require('./userModel');

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

module.exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const userInfo = await UserInfo.create({ firstName, lastName, email, password });
        res.status(201).json(userInfo);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    console.log(firstName, lastName, email, password);
    res.send(req.body);
}
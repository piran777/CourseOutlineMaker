const UserInfo = require('./userModel');

module.exports.signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const userInfo = await UserInfo.create({ firstName, lastName, email, password });
        res.status(201).json(userInfo);
    } catch (err) {
        console.log(err);
        res.status(400).send('Error, user not created');
    }
}

module.exports.login = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    console.log(firstName, lastName, email, password);
    res.send(req.body);
}
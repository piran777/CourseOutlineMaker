module.exports.signup = (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.send(req.body);
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.send(req.body);
}
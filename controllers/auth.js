const User = require('../models/user')

module.exports = (app) => {
    // Sign Up Form
    app.get('/signup', (req, res) => {
        res.render('sign-up');
    });

    app.post('/signup', (req, res) => {
        const user = new User(req.body)
        user
        .save()
        .then((user) => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log('ERROR ' + err)
        })
    });
}
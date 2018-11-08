const User = require('../models/user')
const jwt = require('jsonwebtoken');


module.exports = (app) => {
    // Sign Up Form
    app.get('/signup', (req, res) => {
        res.render('sign-up');
    });

    app.post('/signup', (req, res) => {
        console.log('Sign Up route requested')
        const user = new User(req.body)
        user
            .save()
            .then((user) => {
                var token = jwt.sign({
                    _id: user._id
                }, process.env.SECRET, {
                    expiresIn: "60 days"
                });
                res.cookie('nToken', token, {
                    maxAge: 900000,
                    httpOnly: true
                });
                res.redirect('/')
            })
            .catch((err) => {
                console.log('ERROR ' + err)
            })
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
      });
}
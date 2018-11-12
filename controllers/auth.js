const User = require('../models/user')
const jwt = require('jsonwebtoken');
const alert = require('alert-node')


module.exports = (app) => {
    // Sign Up Form
    app.get('/signup', (req, res) => {
        res.render('sign-up');
    });

    app.post('/signup', (req, res) => {
        console.log('Sign Up route requested')
        if (req.body.password == req.body.passwordConfirmation) {
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
        }

        else {
            alert("Please make sure both passwords match!");
        }
    });

    app.get('/login', (req, res) => {
        res.render('login.handlebars')
    });

    app.post("/login", (req, res) => {
        const username = req.body.username; // Grab the username and password credentials
        const password = req.body.password;
        // Find this user name
        User.findOne({ // Find user by the username
                username
            }, "username password")
            .then(user => {
                if (!user) {
                    // User not found
                    return res.status(401).send({
                        message: "Wrong Username or Password"
                    });
                }
                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        // Password does not match
                        return res.status(401).send({
                            message: "Wrong Username or password"
                        });
                    }
                    // Create a token
                    const token = jwt.sign({
                        _id: user._id,
                        username: user.username
                    }, process.env.SECRET, {
                        expiresIn: "60 days"
                    });
                    // Set a cookie and redirect to root
                    res.cookie("nToken", token, {
                        maxAge: 900000,
                        httpOnly: true
                    });
                    res.redirect("/");
                });
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
}
require('./data/reddit-db')
require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost/reddit-db", {
        useMongoClient: true
    }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);
const express = require('express');
const app = express();
const PostModel = require('./models/post')
const Post = require('./controllers/post');
const bodyParser = require('body-parser');
const JSON = require('circular-json')
const expressValidator = require('express-validator');
const Subreddit = require('./controllers/subreddit')
const Comment = require('./controllers/comment')
const Auth = require('./controllers/auth')

var exphbs = require('express-handlebars');

app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator()); // Add after body parser initialization!

app.get('/', (req, res) => {
    console.log('Cookies on the request ' + req.cookies)
    PostModel.find({}, function(err, posts) {
            console.log('These are the posts ' + err)
            res.render('./posts-index.handlebars', {
                posts
            })
        })
        .catch((err) => {
            console.log(err.message)
        })
});

Post(app);
Subreddit(app);
Comment(app);
Auth(app);

// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Main Template => main.handlebars
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('App listening on port 3000')
});

module.exports = app

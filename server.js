require('./data/reddit-db')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://localhost/redditclone", {
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

var exphbs = require('express-handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator()); // Add after body parser initialization!

app.get('/', (req, res) => {
    PostModel.find({}).then((posts) => {
        // console.log('These are the posts ' + posts)
        res.render('./posts-index.handlebars', {
            posts
        })
    }).catch((err) => {
        console.log(err.message)
    })
});

Post(app);

// Main.handlebars all other templates inherit from
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

// Main Template => main.handlebars
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('App listening on port 3000')
});

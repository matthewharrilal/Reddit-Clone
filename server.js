const express = require('express');
const app = express();
const PostModel = require('./models/post')
const Post = require('./controllers/post');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db')
var exphbs = require('express-handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator()); // Add after body parser initialization!

app.get('/', (req, res) => {
    // const posts = PostModel.find()
    res.render('./main-index', {})
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

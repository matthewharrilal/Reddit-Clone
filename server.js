const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const Post = require('./controllers/post')

app.get('/', (req, res) => {
    res.render('./layouts/main', {})
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

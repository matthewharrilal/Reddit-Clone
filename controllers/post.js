const Post = require('../models/post')

module.exports = function(app) {
    app.get("/posts", (req, res) => {
        res.send('Viewing all available posts')
    });

    app.get("/posts/new", (req, res) => {
        console.log('Rendering forms')
        res.render("./post-new", {})
    });

    app.post("/posts", (req, res) => {
        const post = new Post(req.body);

        post.save((err, post) => {
            return res.redirect('/')
        });
    });
};

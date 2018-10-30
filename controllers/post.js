const Post = require('../models/post')

module.exports = function(app) {
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

    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).then((post) => {
            res.render('post-show', {
                post
            })
        }).catch((err) => {
            console.log(err.message)
        })
    });
};

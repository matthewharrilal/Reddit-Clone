const Post = require('../models/post')
const User = require('../models/user')

module.exports = function (app) {
    app.get("/posts/new", (req, res) => {
        console.log('Rendering forms')
        res.render("./post-new", {})
    });

    app.post("/posts", (req, res) => {
        var post = new Post(req.body);
        post.author = req.user._id

        post
        .save()
        .then((post) => {
            return User.findById(req.user._id)
        })
        .then((user) => {
            user.posts.unshift(post)
            user.save()
            // Redirect to the new post we made
            res.redirect('/posts/'+ post._id)
        })
        .catch((err) => {
            console.log('FATAL ERR ' + err)
        })
    });

    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).populate('comments').then((post) => {
            res.render('../views/post-show', {
                post
            })
        }).catch((err) => {
            console.log(err.message)
        })
    });


};
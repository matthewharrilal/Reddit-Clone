const Comment = require("../models/comment")
const Post = require("../models/comment")

module.exports = function(app) {
    app.post("/posts/:postId/comments", (req, res) => {
        const comment = new Comment(req.body);
        comment
        .save()
        .then((comment) => {
            return Post.findById(req.params.post)
        })
        .then((post) => {
            // Keeping the parents ordered collection through the relationship in reverse order
            post.comments.unshift(comment) // Prepends to array of comments reverse chronological order
            return post.save() // Save the post with the newly added comments
         })
         .then((post) => {
             res.redirect('/')
         })
        .catch((err) => {
            console.log(err)
        })
    });
}

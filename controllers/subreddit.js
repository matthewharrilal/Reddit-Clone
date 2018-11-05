const Post = require('../models/post')


module.exports = function(app) {
    app.get('/n/:subreddit', function(req, res) {
        Post.find({subreddit: req.params.subreddit})
        .then((posts) => {
            console.log('These are the posts ' + posts)
        });
    });
}

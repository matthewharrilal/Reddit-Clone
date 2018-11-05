const Post = require('../models/post')


module.exports = function(app) {
    app.get('/n/:subreddit', function(req, res) {
        console.log(req.params.subreddit)
    });
}

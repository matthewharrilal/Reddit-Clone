module.exports = function(app) {
    app.get("/posts", (req, res) => {
        res.send('Viewing all available posts')
    });

    app.get("/posts/new", (req, res) => {
        console.log('Rendering forms')
        res.render("./post-new", {})
    });

    app.post("/posts", (req, res) => {
        console.log(req.body)
    });
};

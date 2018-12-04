$(document).ready(function() {
    $(".vote-up").submit(function(e) {
        e.preventDefault();
        var postId = $(this).data("id");
        console.log("THIS >>>> " + this)
        $.ajax({
            type: "PUT",
            url: "posts/" + postId + "/vote-up",
            success: function(data) {
                console.log('DATA', data);
            },
            error: function(err) {
                console.log(err.message);
            }
        });
    });

    $(".vote-down").submit(function(e) {
        e.preventDefault();
        var postId = $(this).data("_id");
        $.ajax({
            type: "PUT",
            url: "posts/" + "5c069a6a47a3d962cc21c95e" + "/vote-down",
            success: function(data) {
                console.log("voted down!");
            },
            error: function(err) {
                console.log(err.messsage);
            }
        });
    });
});
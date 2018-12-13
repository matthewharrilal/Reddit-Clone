$(document).ready(function() {
    console.log("ENtering>>>>>>")
    $(".vote-up").submit(function(e) {
        e.preventDefault();
        var postId = $(this).data("id");
        console.log("DATA >>>> " + JSON.stringify(postId))
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
        var postId = $(this).data("id");
        console.log("DATA >>>> " + JSON.stringify(postId))
        $.ajax({
            type: "PUT",
            url: "/posts/" + postId + "/vote-down",
            success: function(data) {
                console.log("voted down!");
            },
            error: function(err) {
                console.log(err.messsage);
            }
        });
    });
});
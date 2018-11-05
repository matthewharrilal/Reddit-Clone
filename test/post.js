const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../app.js")
const Post = require("../models/post")

const samplePost = {
    title: "Test Post",
    url: "https://www.test.com",
    summary: "This is a test post"
}

describe("Posts", () => {
    it("should create with valid attributes at POST /posts", done => {
        const post = new Post(samplePost)
        chai.request(app)
            .send(post)
            .end((err, response, body) => {
                console.log("ERROR SAVING TEST POST " + err.data)
            })

    });
});

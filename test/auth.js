var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require("../models/user");

before(done => {
    agent
      .post("/login")
      .send({ email: "testone", password: "password" })
      .end(function(err, res) {
        done();
      });
  });

describe("User", function () {
    // TESTS WILL GO HERE.

    it("should not be able to login if they have not registered", done => {
        agent.post("/login", {
            // Sending the wrong credentials
            email: "wrong@wrong.com",
            password: "nope"
        }).end(function (err, res) {
            res.status.should.be.equal(401);
            done();
        });
    });

    // signup
    it("should be able to signup", done => {
        User.findOneAndRemove({
            username: "testone"
        }, function () {
            agent
                .post("/signup")
                .send({
                    email: "testone",
                    password: "password"
                })
                .end(function (err, res) {
                    console.log(res.body);
                    // Response should have a status of 200 and the response should bre present on the request 
                    res.should.have.status(200);
                    res.should.have.cookie("nToken");
                });
            done();
        });
    });

    // login
    it("should be able to logout", done => {
        agent.get("/logout").end(function (err, res) {
            res.should.have.status(200);
            res.should.not.have.cookie("nToken");
            done();
        });
    });

    // login
    it("should be able to login", done => {
        agent
            .post("/login")
            .send({
                email: "testone",
                password: "password"
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.have.cookie("nToken");
                done();
            });
    });

});
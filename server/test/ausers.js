import chai from "chai";
import chaiHttp from "chai-http";
import pool from "../config/database";
import app from "../index";
import {
  signup, login, signupValidation, loginError, passwordError
} from "../data/users.json";

chai.use(chaiHttp);
chai.should();

describe("User", () => {
  before(()=>{
    const sql=`DELETE FROM users WHERE email=$1`;
    pool.query(sql,[signup.email])
    .then(()=>{
      console.log("deleted");
    })
    .catch((error)=>{
      console.log(error);
    })
  });

  it("should create user and return status of 201", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signup")
      .set("Content-Type", "application/json")
      .send(signup)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(201);
        res.body.should.have.property("message");
        res.body.should.have.property("token");
        res.body.should.have.property("data");
        done();
      });
  });
  //should return status of 400
  it("should  return status of 400 when creating user", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signup")
      .set("Content-Type", "application/json")
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        done();
      });
  });
  //should return status of 400
  it("should  return status of 400 with validation error", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signup")
      .set("Content-Type", "application/json")
      .send(signupValidation)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        done();
      });
  });
  //should let user signin
  it("should let user signin and return status of 200", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signin")
      .set("Content-Type", "application/json")
      .send(login)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(200);
        res.body.should.have.property("token");
        res.body.should.have.property("data");
        res.body.should.have.property("status");
        done();
      });
  });
  //should return status of 404
  it("should return status of 400", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signin")
      .set("Content-Type", "application/json")
      .send(loginError)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("error");
        done();
      });
  });
  //should return status of 404
  it("should return status of 400 with password error", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signin")
      .set("Content-Type", "application/json")
      .send(passwordError)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        done();
      });
  });
  //should return status of 404
  it("should return status of 400 when signin with validation error", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signin")
      .set("Content-Type", "application/json")
      .send(signupValidation)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        done();
      });
  });
  //should return status of 404
  it("should return status of 400 when there are no fields", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signin")
      .set("Content-Type", "application/json")
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("error");
        res.body.should.have.property("status");
        done();
      });
  });
});

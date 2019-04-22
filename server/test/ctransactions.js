import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { login, signup1 } from "../data/users.json";
import { accounts } from "../data/accounts.json";
import { debit } from "../data/transactions.json";
import pool from "../config/database";

chai.use(chaiHttp);
chai.should();
let token;
let accountNumber;
let token2;

describe("Transaction", () => {
  before("let staff login", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signin")
      .set("Content-Type", "application/json")
      .send(login)
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        token = `Bearer ${res.body.token}`;
        done();
      });
    const sql = "DELETE FROM users WHERE email=$1";
    pool.query(sql, [signup1.email])
      .then(() => {
        console.log("..");
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //
  it("should first create account", (done) => {
    chai.request(app)
      .post("/api/v1/accounts")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(accounts)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        accountNumber = res.body.account.accountnumber;
        done();
      });
  });
  //it("should return status code of 400 with account balance is low", (done) => {
  //chai.request(app)
  //.post(`/api/v1/transaction/${accountNumber}/debit`)
  //.set("Content-Type", "application/json")
  //.set("Authorization", token)
  //.send(debit)
  //.end((error, res) => {
  //if (error) {
  //done(error);
  //}
  //res.should.have.status(400);
  //res.body.should.have.property("status");
  //res.body.should.have.property("error");
  //done();
  //});
  //});
  //it("should let user debit", (done) => {
  //chai.request(app)
  //.post(`/api/v1/transaction/${accountNumber}/debit`)
  //.set("Content-Type", "application/json")
  //.set("Authorization", token)
  //.send({ amount: 500 })
  //.end((error, res) => {
  //if (error) {
  //done(error);
  //}
  //res.should.have.status(201);
  //res.body.should.have.property("status");
  //res.body.should.have.property("message");
  //done();
  //});
  //});
  //it("should return status code of 404 with account number not available", (done) => {
  //chai.request(app)
  //.post("/api/v1/transaction/4564534/debit")
  //.set("Content-Type", "application/json")
  //.set("Authorization", token)
  //.send(debit)
  //.end((error, res) => {
  //if (error) {
  //done(error);
  //}
  //res.should.have.status(404);
  //res.body.should.have.property("status");
  //res.body.should.have.property("error");
  //done();
  //});
  //});
  //it("should return status code of 401 with user not available", (done) => {
  //chai.request(app)
  //.post("/api/v1/transaction/4564534/debit")
  //.set("Content-Type", "application/json")
  //.send(debit)
  //.end((error, res) => {
  //if (error) {
  //done(error);
  //}
  //res.should.have.status(401);
  //res.body.should.have.property("error");
  //done();
  //});
  //});
  it("should create user and return status of 201", (done) => {
    chai.request(app)
      .post("/api/v1/auth/signup")
      .set("Content-Type", "application/json")
      .send(signup1)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        token2 = `Bearer ${res.body.token}`;
        done();
      });
  });
  //it("should respond with unauthorized access and status 0f 400", (done) => {
  //chai.request(app)
  //.post(`/api/v1/transaction/${accountNumber}/debit`)
  //.set("Content-Type", "application/json")
  //.set("Authorization", token2)
  //.send({ amount: 500 })
  //.end((error, res) => {
  //if (error) {
  //done(error);
  //}
  //res.should.have.status(400);
  //res.body.should.have.property("status");
  //res.body.should.have.property("error");
  //done();
  //});
  //});
  //credit test
  it("should return status code of 404 on credit", (done) => {
    chai.request(app)
      .post("/api/v1/transaction/475648654/credit")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(debit)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(404);
        res.body.should.have.property("status");
        done();
      });
  });
  it("should return status code of 201 when doing a credit transaction", (done) => {
    chai.request(app)
      .post(`/api/v1/transaction/${accountNumber}/credit`)
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(debit)
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(201);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  });
  ////
  it("should bring unauthorized access and status 0f 409 on credit transaction", (done) => {
    chai.request(app)
      .post(`/api/v1/transaction/${accountNumber}/credit`)
      .set("Content-Type", "application/json")
      .set("Authorization", token2)
      .send({ amount: 500 })
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(409);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  });
  it("should bring validation error and status 0f 400 on credit transaction", (done) => {
    chai.request(app)
      .post(`/api/v1/transaction/${accountNumber}/credit`)
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send({ amount: "500" })
      .end((error, res) => {
        if (error) {
          done(error);
        }
        res.should.have.status(400);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  });
//it("should bring validation error and status 0f 400 on debit transaction", (done) => {
//chai.request(app)
//.post(`/api/v1/transaction/${accountNumber}/debit`)
//.set("Content-Type", "application/json")
//.set("Authorization", token)
//.send({ amount: "500" })
//.end((error, res) => {
//if (error) {
//done(error);
//}
//res.should.have.status(400);
//res.body.should.have.property("message");
//done();
//});
//});
});

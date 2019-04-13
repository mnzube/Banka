import express from "express";
import Account from "../controllers/accounts";
import Transaction from "../controllers/transactions";
import auth from "../middleware/auth";
const app=express.Router();


//create an account
app.post("/accounts",auth.checkAuth,Account.create);
app.get("/accounts/:id",auth.checkAuth,Account.getOne);
app.get("/accounts",auth.checkAuth,Account.getAll);
app.patch("/accounts/:id",auth.checkAuth,Account.update);
app.delete("/accounts/:id",auth.checkAuth,Account.delete);

//@transaction
app.post("/transaction/:accountNumber/debit",auth.checkAuth,Transaction.debit);

export default app;
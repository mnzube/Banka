import express from "express";
import Transaction from "../controllers/transactions";
import auth from "../middleware/auth";
import {checkType} from "../middleware/userss";
import {checkAccount} from "../middleware/accountCheck";

const app = express.Router();

//transaction
app.post("/:accountNumber/debit", auth.checkAuth, checkType,
checkAccount,Transaction.debit);
app.post("/:accountNumber/credit", auth.checkAuth, checkType,
checkAccount,Transaction.credit);

export default app;

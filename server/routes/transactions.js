import express from "express";
import Transaction from "../controllers/transactions";
import auth from "../middleware/auth";
import Validation from "../middleware/users";
import { checkAccount } from "../middleware/accountCheck";

const app = express.Router();

//transaction
app.post("/:accountNumber/debit", auth.checkAuth, Validation.checkType,
  checkAccount, Transaction.debit);
app.post("/:accountNumber/credit", auth.checkAuth, Validation.checkType,
  checkAccount, Transaction.credit);
//view transaction
app.get("/:transactionId", auth.checkAuth, Validation.checkType, Transaction.findTransaction);
export default app;

import express from "express";
import Transaction from "../controllers/transactions";
import auth from "../middleware/auth";

const app = express.Router();

//transaction
app.post("/:accountNumber/debit", auth.checkAuth, Transaction.debit);
app.post("/:accountNumber/credit", auth.checkAuth, Transaction.credit);

export default app;

import express from "express";
import Account from "../controllers/accounts";
import auth from "../middleware/auth";
import validation from "../middleware/accounts";
import { checkAccount } from "../middleware/accountCheck";
import { checkType } from "../middleware/userss";

const app = express.Router();


//create an account
app.post("/accounts", auth.checkAuth, validation.accountValidation, Account.create);
app.get("/accounts/:accountNumber", auth.checkAuth, checkAccount, Account.getOne);
app.get("/accounts", auth.checkAuth, Account.getAll);
app.patch("/accounts/:accountNumber", auth.checkAuth, checkAccount, Account.update);
app.delete("/accounts/:accountNumber", auth.checkAuth, checkAccount, Account.delete);
//@view transaction
app.get("/accounts/:accountNumber/transactions", auth.checkAuth, checkAccount, Account.getTransactions);
//account type
app.get("/accounts/type/account", auth.checkAuth, checkType, Account.getAccountType);
export default app;

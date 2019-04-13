import express from "express";
const app=express.Router();
import Account from "../controllers/accounts";
import auth from "../middleware/auth";

//create an account
app.post("/accounts",auth.checkAuth,Account.create);
app.get("/accounts/:id",auth.checkAuth,Account.getOne);
app.get("/accounts",auth.checkAuth,Account.getAll);
app.patch("/accounts/:id",auth.checkAuth,Account.update);

export default app;
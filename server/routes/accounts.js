import express from "express";
const app=express.Router();
import Account from "../controllers/accounts";
import auth from "../middleware/auth";

//create an account
app.post("/accounts",auth.checkAuth,Account.create);


export default app;
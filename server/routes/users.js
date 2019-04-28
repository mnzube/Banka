import express from "express";
import users from "../controllers/users";
import Validation from "../middleware/users";
import auth from "../middleware/auth";


const app = express.Router();
//signup
app.post("/auth/signup", Validation.signUpValidation, Validation.checkEmail, users.signup);
//signin
app.post("/auth/signin", Validation.loginValidation, users.signin);
app.get("/user/:email/accounts", auth.checkAuth, users.findAccount);

export default app;

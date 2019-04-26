import express from "express";
import users from "../controllers/users";
import validation from "../middleware/users";
import { checkEmail } from "../middleware/userss";
import auth from "../middleware/auth";


const app = express.Router();
//signup
app.post("/auth/signup", validation.signUpValidation, checkEmail, users.signup);
//signin
app.post("/auth/signin", validation.loginValidation, users.signin);
app.get("/user/:email/accounts", auth.checkAuth, users.findAccount);

export default app;

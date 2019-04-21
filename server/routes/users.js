import express from "express";
import users from "../controllers/users";
import validation from "../middleware/users";
import {checkEmail} from "../middleware/userss";
const app = express.Router();
//signup
app.post("/auth/signup", validation.signUpValidation, checkEmail ,users.signup);
//signin
app.post("/auth/signin", validation.loginValidation, users.signin);

export default app;

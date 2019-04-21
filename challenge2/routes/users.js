import express from "express";
import users from "../controllers/users";
import validation from "../middleware/users";

const app = express.Router();
//signup
app.post("/auth/signup", validation.signUpValidation, users.signup);
//signin
app.post("/auth/signin", validation.loginValidation, users.signin);

export default app;

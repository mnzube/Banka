import express from "express";
const app=express.Router();
import users from "../controllers/users";
//signup
app.post("/auth/signup",users.signup);
//signin
app.post("/auth/signin", users.signin);

export default app;
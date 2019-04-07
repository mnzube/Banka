import express from "express";
const app=express.Router();
import users from "../controllers/users";
//signup
app.post("/signup",users.signup);
//signin
app.post("/signin", users.signin);

export default app;
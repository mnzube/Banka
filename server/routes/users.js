import express from "express";
const app=express.Router();
import users from "../controllers/users";
//signup
app.post("/signup",users.signup);

export default app;

import dotenv from "dotenv";
import pool from "../config/database";

dotenv.config();

class User {
  static async create(data) {
    const regUser = "INSERT INTO users(email,firstname,lastname,password,isadmin,type) VALUES($1,$2,$3,$4,$5,$6) returning *";
    const send = await pool.query(regUser, [data.email, data.firstName, data.lastName,
      data.password, data.isAdmin, data.type]);
    return send;
  }

  static async login(data) {
    const loginUser = "SELECT * FROM users WHERE email=$1";
    const send = await pool.query(loginUser, [data]);
    return send;
  }

  static async findById(data) {
    const usrType = "SELECT * FROM users WHERE id=$1";
    const findData = await pool.query(usrType, [data]);
    return findData;
  }
}

export default User;

import dotenv from "dotenv";
import pool from "../config/database";

dotenv.config();

class AccountModel {
  static async create(newAccount) {
    const createAccnt = "INSERT INTO accounts(type,balance,accountnumber,owner,status) VALUES($1,$2,$3,$4,$5) returning *";
    const account = await pool.query(createAccnt, [newAccount.type, newAccount.balance,
      newAccount.accountNumber, newAccount.owner, newAccount.status]);
    return account;
  }

  static async getOne(data) {
    const getAccnt = "SELECT * FROM accounts WHERE accountnumber=$1 AND owner=$2";
    const get = await pool.query(getAccnt, [data.accountNumber, data.userId]);
    return get;
  }

  static async findAll() {
    const getAllAccnts = "SELECT * FROM accounts";
    const all = await pool.query(getAllAccnts);
    return all;
  }

  static async update(data) {
    const sql = "UPDATE accounts SET status=$1 WHERE accountnumber=$2 returning*";
    const updateData = await pool.query(sql, [data.status, data.accountNumber]);
    return updateData;
  }

  static async findAccountTransaction(data) {
    const sql = "SELECT * FROM transactions WHERE accountnumber=$1";
    const findAccount = await pool.query(sql, [data]);
    return findAccount;
  }

  static async destroy(data) {
    const deleteAccnt = "DELETE FROM accounts WHERE accountnumber=$1 AND owner=$2 returning *";
    const deleteData = await pool.query(deleteAccnt, [data.accountNumber, data.userId]);
    return deleteData;
  }

  static async getAccount(data) {
    const accntCheck = "SELECT * FROM accounts WHERE accountnumber=$1";
    const findData = await pool.query(accntCheck, [data]);
    return findData;
  }
}

export default AccountModel;

import dotenv from "dotenv";
import pool from "../config/database";

dotenv.config();
//const sql = {};

//
//const updateCredit = "UPDATE accounts SET balance=$1 WHERE accountnumber=$2";
//const debit =
//const updateDebit = "UPDATE accounts SET balance=$1 WHERE accountnumber=$2";

//sql.credit = credit;
//sql.updateCredit = updateCredit;
//sql.debit = debit;
//sql.updateDebit = updateDebit;

//export default sql;

class Transaction {
  static async createCredit(data) {
    const credit = "INSERT INTO transactions(transaction_type,accountnumber,amount,newbalance,oldbalance,cashier) VALUES($1,$2,$3,$4,$5,$6) returning *";
    const createTrans = await pool.query(credit, [data.type, data.accountNumber, data.amount,
      data.newBalance, data.oldBalance, data.cashier]);
    return createTrans;
  }

  static async updateAccount(data) {
    const accountUpdate = "UPDATE accounts SET balance=$1 WHERE accountnumber=$2";
    const change = await pool.query(accountUpdate, [data.newbalance, data.accountNumber]);
    return change;
  }

  static async createDebit(data) {
    const debit = "INSERT INTO transactions(transaction_type,accountnumber,amount,newbalance,oldbalance,cashier) VALUES($1,$2,$3,$4,$5,$6) returning *";
    const createTrans = await pool.query(debit, [data.type, data.accountNumber, data.amount,
      data.newBalance, data.oldBalance, data.cashier]);
    return createTrans;
  }
  static async findById(data){
    const sql="SELECT * FROM transactions WHERE transaction_id=$1";
    const findData= await pool.query(sql,[data]);
    return findData;
  }
}

export default Transaction;

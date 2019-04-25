import pool from "../config/database";
import sql from "../models/transaction";

class TransactionController {
  static credit(req, res) {
    //validate amount
    if (!Number.parseFloat(req.body.amount) || typeof (req.body.amount) === "string") {
      return res.status(400).json({ status: 400, message: "amount must be a number" });
    }
    //create transaction
    const data = {
      cashier: req.user.id,
      type: "credit",
      accountNumber: req.params.accountNumber,
      amount: req.body.amount,
      newBalance: req.body.amount + Number(req.accounts.balance),
      oldBalance: req.accounts.balance
    };
    //const send = Transaction.create(data);

    pool.query(sql.credit, [data.type, data.accountNumber, data.amount,
      data.newBalance, data.oldBalance, data.cashier])
      .then((trans) => {
        const send = trans.rows[0];
        //
        if (send.length !== 0) {
          //@update account

          pool.query(sql.updateCredit, [send.newbalance, req.params.accountNumber])
            .then(() => res.status(201).json({
              status: 201,
              message: "transaction done successfully.",
              Transaction: send
            }))
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static debit(req, res) {
    //validate amount
    if (!Number.parseFloat(req.body.amount) || typeof (req.body.amount) === "string") {
      return res.status(400).json({ status: 400, message: "amount must be a number" });
    }
    if (req.accounts.balance <= req.body.amount) {
      return res.status(400).json({ status: 400, message: "low balance" });
    }
    //create transaction
    const data = {
      cashier: req.user.id,
      type: "debit",
      accountNumber: req.params.accountNumber,
      amount: req.body.amount,
      newBalance: Number(req.accounts.balance) - req.body.amount,
      oldBalance: req.accounts.balance
    };
      //const send = Transaction.create(data);

    pool.query(sql.debit, [data.type, data.accountNumber, data.amount,
      data.newBalance, data.oldBalance, data.cashier])
      .then((trans) => {
        const send = trans.rows[0];
        //
        if (send.length !== 0) {
          //update account

          pool.query(sql.updateDebit, [send.newbalance, req.params.accountNumber])
            .then(() => res.status(201).json({
              status: 201,
              message: "transaction done successfully.",
              Transaction: send
            }))
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default TransactionController;

import pool from "../config/database";

class TransactionController {
  static credit(req, res) {
    //validate amount
    if (!Number.parseFloat(req.body.amount) || typeof (req.body.amount) === "string") {
      return res.status(400).send({ status: 400, message: "amount must be a number" });
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
    const sql1 = "INSERT INTO transactions(transaction_type,accountnumber,amount,newbalance,oldbalance,cashier) VALUES($1,$2,$3,$4,$5,$6) returning *";
    pool.query(sql1, [data.type, data.accountNumber, data.amount,
      data.newBalance, data.oldBalance, data.cashier])
      .then((trans) => {
        const send = trans.rows[0];
        //
        if (send.length !== 0) {
          //@update account
          const sql2 = "UPDATE accounts SET balance=$1 WHERE accountnumber=$2";
          pool.query(sql2, [send.newbalance, req.params.accountNumber])
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

  }
}

export default TransactionController;

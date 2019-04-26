import Transaction from "../models/transaction";

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
    Transaction.createCredit(data)
      .then((trans) => {
        const send = trans.rows[0];
        if (send.length !== 0) {
          //@update account
          const datas = {
            newbalance: send.newbalance,
            accountNumber: req.params.accountNumber
          };
          Transaction.updateAccount(datas)
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

    Transaction.createDebit(data)
      .then((trans) => {
        const send = trans.rows[0];
        if (send.length !== 0) {
          //update account
          const datas = {
            newbalance: send.newbalance,
            accountNumber: req.params.accountNumber
          };
          Transaction.updateAccount(datas)
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
  static findTransaction(req,res){
    Transaction.findById(req.params.transactionId)
     .then((transaction)=>{
       return res.status(200).json({status:200, transaction:transaction.rows});
     })
     .catch((error)=>{
       return res.status(500).json({error:error.message});
     })
  }
}

export default TransactionController;

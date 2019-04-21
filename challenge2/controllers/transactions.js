import Account from "../models/accounts";
import Transaction from "../models/transaction";
import User from "../models/users";

class TransactionController {
  static credit(req, res) {
    const findUser = User.findById(req.user.id);
    if (!findUser) {
      return res.status(404).json({ status: 404, error: "sorry user not found" });
    } if (findUser.isAdmin === true) {
      //validate amount
      if (!Number.parseFloat(req.body.amount) || typeof (req.body.amount) === "string") {
        return res.status(400).send({ status: 400, message: "amount must be a number" });
      }
      //checks for account
      const findAccount = Account.findOne(req.params.accountNumber);
      if (!findAccount) {
        return res.status(404).json({ status: 404, error: "account not found." });
      }
      //create transaction
      const data = {
        cashier: req.user.id,
        type: "credit",
        accountNumber: findAccount.accountNumber,
        amount: req.body.amount,
        newBalance: req.body.amount + findAccount.balance,
        oldBalance: findAccount.balance
      };
      const send = Transaction.create(data);
      if (send) {
        const updatedBalance = {
          accountNumber: findAccount.accountNumber,
          balance: send.newBalance
        };
        Account.updateAccountBalance(updatedBalance);
        return res.status(201).json({ status: 201, message: "transaction done successfully.", Transaction: send });
      }
    } else {
      return res.status(400).json({ status: 400, error: "sorry unauthorized access" });
    }
  }

  static debit(req, res) {
    const findUser = User.findById(req.user.id);
    if (!findUser) {
      return res.status(404).json({ status: 404, error: "sorry user not found" });
    } if (findUser.isAdmin === true) {
      //@validate amount
      if (!Number.parseFloat(req.body.amount) || typeof (req.body.amount) === "string") {
        return res.status(400).send({ status: 400, message: "amount must be a number" });
      }
      //@chek account
      const findAccount = Account.findOne(req.params.accountNumber);
      if (!findAccount) {
        return res.status(404).json({ status: 404, error: "account not found." });
      }
      if (findAccount.balance < req.body.amount) {
        return res.status(400).json({ status: 400, error: "your account balance is low." });
      }

      //create transaction
      const data = {
        cashier: req.user.id,
        type: "debit",
        accountNumber: findAccount.accountNumber,
        amount: req.body.amount,
        newBalance: findAccount.balance - req.body.amount,
        oldBalance: findAccount.balance
      };
      const send = Transaction.create(data);
      if (send) {
        const updatedBalance = {
          accountNumber: findAccount.accountNumber,
          balance: send.newBalance
        };
        Account.updateAccountBalance(updatedBalance);
        return res.status(201).json({ status: 201, message: "transaction done successfully.", Transaction: send });
      }
    } else {
      return res.status(400).json({ status: 400, error: "sorry unauthorized access" });
    }
  }
}

export default TransactionController;

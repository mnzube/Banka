import pool from "../config/database";
import sql from "../models/accounts";

class Account {
  //@creates an account
  static create(req, res) {
    const newAccount = {
      type: req.body.type,
      balance: req.body.balance,
      accountNumber: `${new Date().getFullYear()}${Math.floor(100000 + Math.random() * 9000000)}`,
      owner: req.user.id,
      status: "dormant"
    };

    pool.query(sql.createAccnt, [newAccount.type, newAccount.balance,
      newAccount.accountNumber, newAccount.owner, newAccount.status])
      .then((accounts) => {
        const save = accounts.rows[0];
        if (save) {
          return res.status(201).json({
            status: 201,
            message: "account created successfully.",
            account: save
          });
        }
      })
      .catch(error => res.status(500).json({ status: 500, error }));
  }

  //get one account
  static getOne(req, res) {
    pool.query(sql.getAccnt, [req.params.accountNumber, req.user.id])
      .then((account) => {
        if (account.rows.length === 0) {
          return res.status(404).json({ status: 404, message: "account not yours." });
        }
        return res.status(200).send({ status: 200, account: account.rows });
      })
      .catch(error => res.status(500).json({ status: 500, error }));
  }

  //@get all accounts
  static getAll(req, res) {
    pool.query(sql.getAllAccnts)
      .then(accounts => res.status(200).json({ status: 200, accounts: accounts.rows }))
      .catch(error => res.status(500).json({ error }));
  }

  //activates an account
  static update(req, res) {
    const account = req.accounts;
    if (account.status === "active") {
      const deactivate = "dormant";

      pool.query(sql.deactivate, [deactivate, req.params.accountNumber])
        .then(accounts => res.status(200).json({
          status: 200,
          message: `account is ${deactivate}`,
          account: accounts.rows
        }))
        .catch(error => res.status(500).json({ error }));
    } else {
      const activate = "active";

      pool.query(sql.activate, [activate, req.params.accountNumber])
        .then(accounts => res.status(200).json({
          status: 200,
          message: `account is ${activate}`,
          account: accounts.rows
        }))
        .catch(error => res.status(500).json({ error }));
    }
  }

  //@deletes an account
  static delete(req, res) {
    pool.query(sql.deleteAccnt, [req.params.accountNumber, req.user.id])
      .then((accounts) => {
        if (accounts.rows.length === 0) {
          return res.status(409).json({ status: 409, message: "forbidden access, account not yours." });
        }
        const account = accounts.rows;
        return res.status(200).json({ status: 200, message: "account deleted", data: account });
      })
      .catch(error => res.status(500).json({ error }));
  }
}
export default Account;

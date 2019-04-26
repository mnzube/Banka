import AccountModel from "../models/accounts";

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
    AccountModel.create(newAccount)
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
    const data = {
      accountNumber: req.params.accountNumber,
      userId: req.user.id
    };
    AccountModel.getOne(data)
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
    AccountModel.findAll()
      .then(accounts => res.status(200).json({ status: 200, accounts: accounts.rows }))
      .catch(error => res.status(500).json({ error }));
  }

  //activates an account
  static update(req, res) {
    const account = req.accounts;
    if (account.status === "active") {
      const deactivate = "dormant";
      const data = {
        status: deactivate,
        accountNumber: req.params.accountNumber
      };
      AccountModel.update(data)
        .then(accounts => res.status(200).json({
          status: 200,
          message: `account is ${deactivate}`,
          account: accounts.rows
        }))
        .catch(error => res.status(500).json({ error }));
    } else {
      const activate = "active";
      const value = {
        status: activate,
        accountNumber: req.params.accountNumber
      };
      AccountModel.update(value)
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
    const data = {
      accountNumber: req.params.accountNumber,
      userId: req.user.id
    };
    AccountModel.destroy(data)
      .then((accounts) => {
        if (accounts.rows.length === 0) {
          return res.status(409).json({ status: 409, message: "forbidden access, account not yours." });
        }
        const account = accounts.rows;
        return res.status(200).json({ status: 200, message: "account deleted", data: account });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }

  //get transaction
  static getTransactions(req, res) {
    AccountModel.findAccountTransaction(req.params.accountNumber)
      .then((account) => {
        const accounts = account.rows;
        return res.status(200).json({ status: 200, accounts });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }

  static getAccountType(req, res) {
    const { status } = req.query;
    if (!status || status === "" || status === undefined) {
      return res.status(400).json({ status: 400, message: "invalid account." });
    }
    AccountModel.dormantAccount(status)
      .then((accounts) => {
        if (accounts.rows.length === 0) {
          return res.status(200).json({
            status: 200,
            message: `Sorry there are no ${status} accounts.`,
            accounts: accounts.rows
          });
        }
        return res.status(200).json({ status: 200, accounts: accounts.rows });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }
}

export default Account;

import pool from "../config/database";

class Account {
  //@creates an account
  static create(req, res) {
    const newAccount = {
      type: req.body.type,
      balance: req.body.balance,
      accountNumber: `${new Date().getFullYear()}-${Math.random()}`,
      owner: req.user.id,
      status: "dormant"
    };
    const sql = "INSERT INTO accounts(type,balance,accountnumber,owner,status) VALUES($1,$2,$3,$4,$5) returning *";
    pool.query(sql, [newAccount.type, newAccount.balance,
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
    const account = AccountModel.findOne(req.params.id);
    if (!account) {
      return res.status(404).send({ status: 404, message: "account not found" });
    }
    return res.status(200).send({ status: 200, account });
  }

  //@get all accounts
  static getAll(req, res) {
    const sql = "SELECT * FROM accounts";
    pool.query(sql)
      .then(accounts => res.status(200).json({ status: 200, accounts: accounts.rows }))
      .catch(error => res.status(500).json({ error }));
  }

  //activates an account
  static update(req, res) {
    const account = req.accounts;
    if (account.status === "active") {
      const deactivate = "dormant";
      const sql = "UPDATE accounts SET status=$1 WHERE accountnumber=$2 returning*";
      pool.query(sql, [deactivate, req.params.accountNumber])
        .then(accounts => res.status(200).json({
          status: 200,
          message: `account is ${deactivate}`,
          account: accounts.rows
        }))
        .catch(error => res.status(500).json({ error }));
    } else {
      const activate = "active";
      const sql = "UPDATE accounts SET status=$1 WHERE accountnumber=$2 returning*";
      pool.query(sql, [activate, req.params.accountNumber])
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
    const account = AccountModel.findOne(req.params.id);
    if (!account) {
      return res.status(404).send({ message: "Account not found" });
    }
    const ref = AccountModel.delete(req.params.id);
    return res.status(200).json({ status: 200, message: "account deleted", data: ref });
  }
}
export default Account;

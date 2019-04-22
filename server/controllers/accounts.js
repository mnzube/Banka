import pool from "../config/database";

class Account {
  //@creates an account
  static create(req, res) {
    const newAccount = {
      type: req.body.type,
      balance: req.body.balance,
      accountNumber: `${new Date().getFullYear()}-${Math.random()}`,
      owner:req.user.id
    };
    const sql = "INSERT INTO accounts(type,balance,accountnumber,owner) VALUES($1,$2,$3,$4) returning *";
    pool.query(sql, [newAccount.type,newAccount.balance,
      newAccount.accountNumber,newAccount.owner])
      .then((accounts) => {
        const save = accounts.rows[0];
        if (save) {
           return res.status(201).json({status:201,message:'account created successfully.',
           account:save});
        }
      })
      .catch(error => res.status(500).json({ status: 500, error}));
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
    const accounts = AccountModel.findAll();
    return res.status(200).send({ status: 200, accounts });
  }

  //activates an account
  static update(req, res) {
    const account = AccountModel.findOne(req.params.id);
    if (!account) {
      return res.status(404).send({
        message: "account not found"
      });
    }
    if (account.status === "active") {
      const deactivate = "dormant";
      const updateAccount = AccountModel.update(req.params.id, deactivate);
      return res.status(200).send({ message: `account is ${deactivate}`, updateAccount });
    }
    const activate = "active";
    const updateAccount = AccountModel.update(req.params.id, activate);
    return res.status(200).send({ message: `account is ${activate}`, updateAccount });
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

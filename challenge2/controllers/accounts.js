import AccountModel from "../models/accounts";

class Account {
  //@creates an account
  static create(req, res) {
    if (
      !req.body.type
         && !req.body.balance) {
      return res.status(400).send({ message: "All fields are required" });
    }
    if (req.body.type === ""
         || req.body.status === "") {
      return res.status(400).send({ message: "All fields are required" });
    }
    if (!Number.parseFloat(req.body.balance) || typeof (req.body.balance) === "string") {
      return res.status(400).send({ message: "balance must be a number" });
    }
    const data = AccountModel.create(req.body, req.user.id);
    return res.status(201).json({
      status: 201,
      message: "Account created succesfully",
      data
    });
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

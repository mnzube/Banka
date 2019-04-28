import Account from "../models/accounts";

const checkAccount = (req, res, next) => {
  Account.getAccount(req.params.accountNumber)
    .then((account) => {
      if (account.rows.length !== 0) {
        req.accounts = account.rows[0];
        next();
      } else {
        return res.status(404).json({ status: 404, message: "account not found." });
      }
    })
    .catch(error => res.status(500).json({ status: 500, error }));
};

export {
  checkAccount
};

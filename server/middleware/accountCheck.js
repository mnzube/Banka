import pool from "../config/database";

const checkAccount = (req, res, next) => {
  const sql = "SELECT * FROM accounts WHERE accountnumber=$1";
  pool.query(sql, [req.params.accountNumber])
    .then((account) => {
      if (account.rows.length !== 0) {
        req.accounts = account.rows[0];
        next();
      }else{
        return res.status(404).json({ status: 404, message: "account not found." });
      }
      
    })
    .catch((error) => {
      return res.status(500).json({error});
    });
};

export {
  checkAccount
};

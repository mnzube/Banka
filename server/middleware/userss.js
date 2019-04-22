import pool from "../config/database";

const checkEmail = (req, res, next) => {
  const sql = "SELECT * FROM users WHERE email=$1";
  pool.query(sql, [req.body.email])
    .then((user) => {
      if (user.rows.length !== 0) {
        return res.status(409).json({ status: 409, error: "email already exists." });
      }
      next();
    });
};
export {
  checkEmail
};

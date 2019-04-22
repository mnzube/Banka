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

const checkType = (req, res, next) => {
  const sql = "SELECT * FROM users WHERE id=$1";
  pool.query(sql, [req.user.id])
    .then((user) => {
      const users = user.rows[0];
      if (users.type !== "staff") {
        return res.status(409).json({
          status: 409,
          message: "sorry you are not allowed to perform this action."
        });
      }
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  checkEmail,
  checkType
};

import pool from "../config/database";
import sql from "../models/users";


const checkEmail = (req, res, next) => {
  pool.query(sql.chckEmail, [req.body.email])
    .then((user) => {
      if (user.rows.length !== 0) {
        return res.status(409).json({ status: 409, error: "email already exists." });
      }
      next();
    });
};

const checkType = (req, res, next) => {
  pool.query(sql.usrType, [req.user.id])
    .then((user) => {
      const users = user.rows[0];
      if (users.type !== "cashier") {
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

import User from "../models/users";


const checkEmail = (req, res, next) => {
  User.login(req.body.email)
    .then((user) => {
      if (user.rows.length !== 0) {
        return res.status(409).json({ status: 409, error: "email already exists." });
      }
      next();
    });
};
const checkType = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      const users = user.rows[0];
      if (users.type !== "cashier" || users.type === undefined) {
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

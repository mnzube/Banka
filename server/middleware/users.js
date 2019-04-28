import User from "../models/users";


const Validation = {
  signUpValidation: (req, res, next) => {
  //validation
    if (!req.body.email || !req.body.firstName || !req.body.lastName
        || !req.body.password || req.body.email === ""
        || req.body.password === "" || req.body.lastName === ""
         || req.body.firstName === "") {
      return res.status(400).json({ status: 400, error: "first name, last name, email or password required" });
    }
    next();
  },
  loginValidation: (req, res, next) => {
    //validation
    if (!req.body.email || !req.body.password || req.body.email === "" || req.body.password === "") {
      return res.status(400).json({
        status: 400,
        error: "first name, last name, email or password required"
      });
    }
    next();
  },
  checkEmail: (req, res, next) => {
    User.login(req.body.email)
      .then((user) => {
        if (user.rows.length !== 0) {
          return res.status(409).json({ status: 409, error: "email already exists." });
        }
        next();
      });
  },
  checkType: (req, res, next) => {
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
  }
};

export default Validation;

const Validation = {
  signUpValidation: (req, res, next) => {
  //validation
    if (!req.body.email || !req.body.firstName || !req.body.lastName
        || !req.body.password || req.body.email === ""
        || req.body.password === "" || req.body.lastName === ""
         || req.body.firstName === "") {
      return res.status(400).json({ status: 400, error: "all fields are required" });
    }
    next();
  },
  loginValidation: (req, res, next) => {
    //validation
    if (!req.body.email || !req.body.password || req.body.email === "" || req.body.password === "") {
      return res.status(400).json({
        status: 400,
        error: "all fields are required"
      });
    }
    next();
  }
};

export default Validation;

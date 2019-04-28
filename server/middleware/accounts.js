const Validation = {
  accountValidation: (req, res, next) => {
    if (
      !req.body.type
       && !req.body.balance) {
      return res.status(400).send({ status: 400, message: "Account type or balance required" });
    }
    if (req.body.type === ""
       || req.body.status === "") {
      return res.status(400).send({ status: 400, message: "Account type and status required" });
    }
    if (!Number.parseFloat(req.body.balance) || typeof (req.body.balance) === "string") {
      return res.status(400).send({ status: 400, message: "balance must be a number" });
    }
    next();
  }
};

export default Validation;

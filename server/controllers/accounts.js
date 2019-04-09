import AccountModel from "../models/accounts"

const Account = {
    //@creates an account
    create(req, res) {
      if (!req.body.accountNumber &&
         !req.body.firstName && 
         !req.body.lastName &&
         !req.body.email &&
         !req.body.accountType &&
         !req.body.openingBalance ) {
        return res.status(400).send({'message': 'All fields are required'});
      }
      if(req.body.accountNumber ==="" ||
         req.body.firstName ==="" ||
         req.body.lastName ===""  ||
         req.body.email === "" || 
         req.body.accountType === "" ||
         req.body.openingBalance === "" ){
        return res.status(400).send({'message': 'All fields are required'});
      }
      const data = AccountModel.create(req.body);
      return res.status(201).json({status:201,'message':'Account created succesfully',data});
    }}
    export default Account ;
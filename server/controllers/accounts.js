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
    },

    getOne(req, res) {
      const account = AccountModel.findOne(req.params.id);
      if (!account) {
        return res.status(404).send({status:404,'message': 'account not found'});
      }
      return res.status(200).send({status:200,account});
    }
  }
    export default Account ;
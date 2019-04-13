import Account from "../models/accounts";
import Transaction from "../models/transaction";
import User from "../models/users";

const TransactionController={
    debit(req,res){
    const findUser=User.findById(req.user.id);
    if(!findUser){
    return res.status(404).json({error:'sorry user not found'});
    }else if(findUser.type==='staff'){
      //@validate amount
      if(!Number.parseFloat(req.body.amount) || typeof(req.body.amount)==='string'){
        return res.status(400).send({'message': 'amount must be a number'});
      }
      //@chek account
      const findAccount=Account.findOne(req.params.accountNumber);
      if(!findAccount){
        return res.status(404).json({error:'account not found.'});
      }else{
        //create transaction
        const data={
         cashier:req.user.id,
         type:'debit',
         accountNumber:findAccount.accountNumber,
         amount:req.body.amount,
         newBalance:req.body.amount + findAccount.balance,
         oldBalance:findAccount.balance
        };
        const send=Transaction.create(data);
        return res.status(201).json({status:201,message:'transaction done successfully.',Transaction:send});
      }
    }else{
        return res.status(400).json({error:'sorry unauthorized access'});
    }
    }
}
export default TransactionController;
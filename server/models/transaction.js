import uuid from "uuid";
class Transaction {
    constructor() {
      this.transaction = [];
    }
    //creates an account
    create(data) {
    const newTransaction = {
        id:uuid.v4(),
        accountNumber:data.accountNumber,
        cashier:data.cashier,
        type:data.type,
        amount:data.amount,
        oldBalance:data.oldBalance,
        newBalance:data.newBalance,
        createdOn:new Date()
    };
    this.transaction.push(newTransaction);
    return newTransaction;
    }

}

  export default new Transaction() ;
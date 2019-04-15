import uuid from "uuid";
class Account {
    constructor() {
      this.accounts = [];
    }
    //creates an account
    create(data,userId) {
      const newAccount = {
        id:uuid.v4(),
        accountNumber: new Date().getFullYear()+'-'+Math.random(),
        owner:userId,
        type:data.type,
        balance:data.balance,
        status: 'dormant',
        createdOn:new Date()
      
      };
      this.accounts.push(newAccount);
      return newAccount
    }
  //@finds one account
  findOne(accountNumber) {
    return this.accounts.find(account =>  account.accountNumber === accountNumber);
  }
   //@finds all accounts
   findAll() {
    return this.accounts;
  }
  // //@Account status
   update(id,data) {
   const account =this.findOne(id);
    const index = this.accounts.indexOf(account);
     this.accounts[index].status= data;
     return this.accounts[index];
  }
  //@deletes an account
  delete(id) {
    const account = this.findOne(id);
    const index = this.accounts.indexOf(account);
    const deleted = this.accounts.splice(index, 1);
    return deleted;
  }
  updateAccountBalance(data){
    const account=this.findOne(data.accountNumber);
    const index=this.accounts.indexOf(account);
    const update=this.accounts[index].balance=data.balance;
    return update;
  }
}

  export default new Account() ;
import uuid from "uuid";
class Account {
    constructor() {
      this.accounts = [];
    }
    //creates an account
    create(data) {
      const newAccount = {
        accountNumber: uuid.v4(),
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        accountType:data.accountType,
        openingBalance:data.openingBalance,
        status: 'dormant'
      
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
}

  export default new Account() ;
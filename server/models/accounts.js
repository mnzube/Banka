import uuid from "uuid";
class Account {
    constructor() {
      this.accounts = [];
    }
    //creates an account
    create(data) {
      const newAccount = {
        accountNumber: uuid.v4(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accountType:data.accountType,
        openingBalance:data.openingBalance
      
      };
      this.accounts.push(newAccount);
      return newAccount
    }
  }
  export default new Account() ;
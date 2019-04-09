class Account {
    constructor() {
      this.accounts = [];
    }
    //creates an account
    create(data) {
      const newAccount = {
        accountNumber: data.accountNumber,
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
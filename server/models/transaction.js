const sql = {};

const credit = "INSERT INTO transactions(transaction_type,accountnumber,amount,newbalance,oldbalance,cashier) VALUES($1,$2,$3,$4,$5,$6) returning *";
const updateCredit = "UPDATE accounts SET balance=$1 WHERE accountnumber=$2";
const debit = "INSERT INTO transactions(transaction_type,accountnumber,amount,newbalance,oldbalance,cashier) VALUES($1,$2,$3,$4,$5,$6) returning *";
const updateDebit = "UPDATE accounts SET balance=$1 WHERE accountnumber=$2";

sql.credit = credit;
sql.updateCredit = updateCredit;
sql.debit = debit;
sql.updateDebit = updateDebit;

export default sql;

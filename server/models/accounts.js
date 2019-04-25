const sql = {};

const createAccnt = "INSERT INTO accounts(type,balance,accountnumber,owner,status) VALUES($1,$2,$3,$4,$5) returning *";
const getAccnt = "SELECT * FROM accounts WHERE accountnumber=$1 AND owner=$2";
const getAllAccnts = "SELECT * FROM accounts";
const activate = "UPDATE accounts SET status=$1 WHERE accountnumber=$2 returning*";
const deactivate = "UPDATE accounts SET status=$1 WHERE accountnumber=$2 returning*";
const deleteAccnt = "DELETE FROM accounts WHERE accountnumber=$1 AND owner=$2 returning *";
const accntCheck = "SELECT * FROM accounts WHERE accountnumber=$1";

sql.accntCheck = accntCheck;
sql.createAccnt = createAccnt;
sql.getAccnt = getAccnt;
sql.getAllAccnts = getAllAccnts;
sql.activate = activate;
sql.deactivate = deactivate;
sql.deleteAccnt = deleteAccnt;

export default sql;

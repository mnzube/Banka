const sql = {};

const regUser = "INSERT INTO users(email,firstname,lastname,password,isadmin,type) VALUES($1,$2,$3,$4,$5,$6) returning *";
const loginUser = "SELECT * FROM users WHERE email=$1";
const chckEmail = "SELECT * FROM users WHERE email=$1";
const usrType = "SELECT * FROM users WHERE id=$1";

sql.regUser = regUser;
sql.loginUser = loginUser;
sql.chckEmail = chckEmail;
sql.usrType = usrType;

export default sql;

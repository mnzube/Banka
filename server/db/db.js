import db from '../config/database';

const createTable =()=>new Promise((resolve,reject)=>{
const tables =
 `CREATE TABLE IF NOT EXISTS
 accounts(
     account_id SERIAL PRIMARY KEY NOT NULL,
     accountnumber VARCHAR(255) NOT NULL,
     owner INTEGER NOT NULL,
     type VARCHAR(255) NOT NULL,
     balance VARCHAR(255) NOT NULL,
     createdon DATE DEFAULT CURRENT_DATE NOT NULL 
 );
 CREATE TABLE IF NOT EXISTS
 users(
     id serial PRIMARY KEY NOT NULL,
     firstname VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     type VARCHAR(255) NOT NULL,
     isadmin BOOLEAN DEFAULT false NOT NULL
 );`;

 db.query(tables)
 .then((res)=> {
     //console.log(res);
     resolve();    
 })
 .catch((error)=>{
    // console.log(error);
     reject(error);
 })
});
const dropTable =()=>new Promise ((resolve,reject)=>{
    const tables = 
    `DROP TABLE IF EXISTS accounts CASCADE;
     DROP TABLE IF EXISTS users CASCADE;
    `;
    db.query(tables)
 .then((res) =>{
 //console.log(res);
 resolve();
})
.catch((error)=>{
//console.log(error);
reject(error);
});
});

 export{createTable, dropTable};

 require('make-runnable');

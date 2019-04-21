import db from '../config/database';

const createTable =()=>new Promise((resolve,reject)=>{
const tables =
 `CREATE TABLE IF NOT EXISTS
 users(
     id SERIAL PRIMARY KEY NOT NULL,
     firstname VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     type VARCHAR(255) NOT NULL,
     isadmin BOOLEAN DEFAULT false NOT NULL
 );`
 db.query(tables)
 .then((res)=> {
    // console.log(res);
     resolve();    
 })
 .catch((error)=>{
    // console.log(error);
     reject(error);
 })
});
const dropTable =()=>new Promise ((resolve,reject)=>{
    const tables = 
    `DROP TABLE IF EXISTS users CASCADE;`;
    db.query(tables)
 .then((res) =>{
 console.log(res);
 resolve();
})
.catch((error)=>{
console.log(error);
reject(error);
});
});

 export {createTable, dropTable};

require('make-runnable');

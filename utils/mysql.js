import mysql from 'mysql'
//initialize dotenv
require('dotenv').config();


//initialize mysql
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

//query to login
export const Login = (username, password) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM tb_usuarios WHERE nombre_usuario=? AND contrasena=?",[username, password],(err,results, fields)=>{
                if(err){
                    reject(err);
                }

                resolve( results.length > 0 ? results[0].cargo_usuario : 2);
          })
    });
}

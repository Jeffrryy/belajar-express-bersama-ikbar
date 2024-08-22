import mysql from "mysql";

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"db_univertas",
    multipleStatements: true
});
// koneksi database
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
 
export default db
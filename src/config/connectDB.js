require("dotenv").config();
import mysql from "mysql2";

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("Database connected");
    }
});

//db.query("SELECT * from users ", function(error, rows) {
//    if (error) throw error;
//    console.log(rows); 
//});

module.exports = db;

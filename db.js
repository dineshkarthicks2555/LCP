const {Pool}= require('pg');

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "Employee_management",
    port: "5432",
    max: 10,

})

pool.connect((err, connection)=>{
    if (err) throw err;
    console.log("Connected to the database successfully!");
    connection.release();
    
});

module.exports = pool;
const express = require('express');
const db = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const router = express.Router();
const bodyParser = require('body-parser');


router.use(cors());  
router.use(bodyParser.json());  
router.use(bodyParser.urlencoded({ 
    extended: true 
}));

//Get
router.get('/getaccounts', (req, res)=>{
    const sql = "SELECT * FROM accounts";
    db.query(sql, (err, result)=>{
        if(err) throw err;
        return res.json(result.rows);
    })});

//Post
router.post('/addaccounts', async (req, res) => {
 try {
    const { name, type, balance } = req.body;
    const sql = `INSERT INTO accounts (name, type, balance) VALUES ($1, $2, $3) RETURNING *`;

    const result = await db.query(sql, [name,type,balance]);

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);
    res.status(500).json({
     error: err.message
    });
}
});
//Put

router.put('/updateaccounts/:id', async (req, res) => {
try {
const { id } = req.params;
const { name, type, balance } = req.body;
const sql = `UPDATE accounts SET name = $1,type = $2,balance = $3 WHERE id = $4 RETURNING *`;
const result = await db.query(sql, [name,type,balance,id]);
    res.json(result.rows[0]);
  } catch (err) {   
    console.log(err);
    res.status(500).json({
      error: err.message
    });
  }
});

    //Delete

    router.delete('/deleteaccounts/:id', (req, res)=>{
    const sql = "DELETE FROM accounts WHERE id=$1 RETURNING *";
    db.query(sql, [req.params.id], (err, result)=>{
        if(err) throw err;
        return res.json(result.rows[0]);
    })});  



    module.exports = router;
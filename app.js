//constants or modules
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const controller = require('./controller');

// create node js server
const app = express();  
app.use(controller);
app.use(cors());
app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})

app.listen(3000, () => {
  console.log('Server running');
});

// Register a new user
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const format = require("date-fns");
const { encryptData, decryptData, generateToken, verifyToken } = require("./extras.js");
const BodyParser = require("body-parser");
var fs = require('fs');
const rfs = require("rotating-file-stream")
const PORT = 8080;

const app = express();
const mySQL_connection = mysql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASS,
    database:process.env.DBNAME
});

mySQL_connection.connect((err)=>{
     if (err) {
    console.error('MYSQL=> error connecting: ' + err.stack);
    return;
  }
 
  console.log('MYSQL=> connected as id ' + mySQL_connection.threadId);
});

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());

function logFileName(time) {
    if (!time) return 'access.log';
    return `${format.format(time, "dd-MM-yyyy")}-access.log`;
}



const rfsStream = rfs.createStream(logFileName(new Date()), {
    interval: "1d",
    path: "./logs/"
})

app.use(morgan("combined", {
    stream: rfsStream
}));

app.post("/login",(req,res)=>{
    if(!req.body) return res.status(401).json({error:"Missing Params"});
    const {username,password} = req.body;

    const results = mySQL_connection.query(`SELECT * FROM users WHERE username='${username}'`,(err,results)=>{
        if (err) res.status(500).json({err:"Data quering error"});

        if(results.length>0){
            const user_pass = results[0].password;
            if(user_pass === decryptData(password)){
                var token = generateToken(username,role);
                res.json({u_token:token,names: results[0].names});
            }else{
                res.json({msg:"Wrong Password"});
            }
        }else{
            res.json({msg:"User does not exist"});
        }
    });

});
app.get("/transactions",(req,res)=>{
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.status(403).json({error:"Missing token"});

    try{
        var tokenVerify = verifyToken(token);
        var userInfo = tokenVerify.tokeninfo;

        mySQL_connection.query("SELECT * FROM transactions ORDER BY date DESC",(err,results)=>{
             if (err) res.status(500).json({err:"Data quering error"});
             res.json({data: results});
        })
    }catch(err){
        res.status(403).json({msg:"Token invalid"})
    }

})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
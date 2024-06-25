const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const bodyParser = require('body-parser');

const app=express();
const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     res.send("lol");
// });

const uri=process.env.ATLAS_URI;
mongoose.connect(uri).then(()=>{console.log("database established");}).catch(()=>{console.log("not connected")});


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  })

const userRouter=require("./routes/user");
app.use("/",userRouter);



app.listen(port,()=>{console.log(`server is running on port:${port}`);});
const router=require('express').Router();
const Notes=require("../models/notes.model");
const User=require("../models/user.model");
const jwt=require('jsonwebtoken');
const auth=require('../auth/auth.js');
require('dotenv').config();

router.route('/logout').get((req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(0)
   }).send("logged out");
});

router.route("/register").post((req,res)=>{
    var name=req.body.name;
    var username=req.body.username;
    var phno=req.body.phno;
    var password=req.body.password;
    const newuser=new User({name,username,phno,password});
    newuser.save().then(ress=>{
        res.send("successfully registered!");
    }).catch(err=>{
        res.send("Unable to register :(");
        console.log(err);
    });
});

router.route("/login").post(async(req,res)=>{

    var username=req.body.username;
    var password=req.body.password;
    const result= await User.findOne({username:username,password:password});
    if(result)
    {
        console.log(result);
        var ids2=result._id;
        const tokenf=jwt.sign({id:ids2},process.env.SECRET_KEY);
        console.log(JSON.stringify(ids2));
        res.cookie("token",tokenf,{
            httpOnly:true,
            sameSite:'none',
            secure:true
        }).send(true);
    }
    else res.send(false);
});

router.route("/mobileotp").post(auth,(req,res)=>{
    res.header('Content-Type', 'application/json');
    const accountSid = '<accountSID>';
    const authToken = '<authToken>';
    const client = require('twilio')(accountSid, authToken);
    console.log("testomng")
    var mobile=User.find({})
    client.messages
        .create({
            body: 'heyyyy',
            from: '+18147476951',
            to: '+918110031918'
        })
        .then(message => console.log(message.sid)).catch(err=>console.log(err));
        // .done();
})


router.route("/newnotes").post(auth,(req,res)=>{
    console.log("lol");
    var userid=req.userid;
    var date=req.body.date;
    var time=req.body.time;
    var notes=req.body.notes;
    const newnotes=new Notes({userid,date,time,notes});
    newnotes.save().then(ress=>{
        res.send("successfully added!");
    }).catch(err=>{
        res.send("Unable to add :(");
        console.log(err);
    });
});

router.route("/findnotes").get(async(req,res)=>{
    var notes=req.body.notes;
    const obj= await Notes.find({notes:{$regex:'.*'+notes+'.*'}})
    if(obj)
    {
        console.log(obj);
        res.send(obj);
    }else res.send("err");
});



module.exports=router;
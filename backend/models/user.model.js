const mongoose=require('mongoose');

const schema=mongoose.Schema;

const userSchema=new schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    phno:{type:String,required:true},
    password:{type:String,required:true}
},{ 
    timestamps:true,
});
const userSchema1=mongoose.model('userdetail',userSchema);
module.exports=userSchema1;
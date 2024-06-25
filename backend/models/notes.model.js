const mongoose=require('mongoose');

const schema=mongoose.Schema;

const notesSchema=new schema({
    userid:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    notes:{type:String,required:true}
},{ 
    timestamps:true,
});
const notesSchema1=mongoose.model('notesdetail',notesSchema);
module.exports=notesSchema1;
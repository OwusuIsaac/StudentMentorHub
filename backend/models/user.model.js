const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,enum:["male","female"],default:"male",required:true},
    role:{type:String,enum:["senior","freshman","admin"],default:"freshman",required:true},
    location:{type:String,required:true},
    senior_major_division:String
})

const Usermodel=mongoose.model("user",userSchema);

module.exports={
    Usermodel
}

const mongoose=require("mongoose");
const{ObjectId}=require("bson");

const meetupsSchema=mongoose.Schema({
    senior_id:{type:ObjectId,ref:"user",required:true},
    freshman_id:{type:ObjectId,ref:"user",required:true},
    date:{type:String,required:true},
    time_slot:{type:String,required:true}
});


const MeetUpsmodel=mongoose.model("meetups",meetupsSchema);

module.exports={
    MeetUpsmodel
}

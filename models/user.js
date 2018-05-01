const mongoose=require("mongoose");
const congregacionSchema=require("./congregacion");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    grupo:{
        type:Number,
        required:true
    },
    congregacion:{
        type:Schema.Types.ObjectId,
        ref:'Congregacion',
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("User",UserSchema);
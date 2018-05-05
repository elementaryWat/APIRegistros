const mongoose=require("mongoose");
const Schema=mongoose.Schema;

var FamiliaSchema=new Schema({
    apellido:{
        type:String,
        required:true
    },
    congregacion:{
        type:Schema.Types.ObjectId,
        ref:'Congregacion',
        required:true
    }
},
{
    timestamps:true
})
module.exports=mongoose.model('Familia',FamiliaSchema);
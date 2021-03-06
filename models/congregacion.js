const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const congregacionSchema=new Schema({
    nombre:{
        type:String,
        required:true,
        unique:true
    },
    direccion:{
        type:String,
        required:true
    },
    cantidadGrupos:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})
module.exports=mongoose.model("Congregacion",congregacionSchema);
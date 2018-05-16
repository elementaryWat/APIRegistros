const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var telefonoSchema=new Schema({
    tipo:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    conWhatsApp:Boolean,
    empresa:String
})

module.exports=telefonoSchema;
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const HermanoSchema=new Schema({
    nombre:{
        type:String,
        required:true,
    },
    familia:{
        type:Schema.Types.ObjectId,
        ref:'Familia',
        required:true
    },
    genero:{
        type:String,
        required:true
    },
    domicilio:{
        type:String,
        required:true,
    },
    grupo:{
        type:Number,
        required:true
    },
    telefono:String,
    celular:String,
    fechaNacimiento:{
        type:Date,
        required:true
    },
    bautizado:{
        type:Boolean,
        required:true
    },
    fechaBautismo:{
        type:Date,
        required:true
    },
    ungido:{
        type:Boolean,
        required:true
    },
    siervoMinisterial:Boolean,
    anciano:Boolean,
    precReg:{
       type:Boolean,
       required:true 
    },
    idPrecursor:String,
    fechaNombramientoPrecursor:Date
},{
    timestamps:true
})

module.exports=mongoose.model("Hermano",HermanoSchema);
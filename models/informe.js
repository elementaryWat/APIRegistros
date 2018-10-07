const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const InformeSchema=new Schema({
    month:{
        type:number,
        required:true,
    },
    year:{
        type:number,
        required:true,
    },
    congregacion:{
        type:Schema.Types.ObjectId,
        ref:'Congregacion',
        required:true
    },
    hermano:{
        type:Schema.Types.ObjectId,
        ref:'Hermano',
        required:true
    },
    publicaciones:{
        type:Number,
        required:true
    },
    videos:{
        type:Number,
        required:true
    },
    horas:{
        type:Number,
        required:true,
    },
    revisitas:{
        type:Number,
        required:true
    },
    estudios:{
        type:Number,
        required:true
    },
    notas:{
        type:String,
        required:true
    },
    precReg:{
        type:Boolean,
        required:true
    },
    precAux:{
        type:Boolean,
        required:true
    },
    
},{
    timestamps:true
})

module.exports=mongoose.model("Informe",InformeSchema);
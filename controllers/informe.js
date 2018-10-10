const Informes = require('../models/informe');
const Hermanos = require('../models/hermano');
const Familias = require('../models/familia');


function obtenerInformes(req, res) {
    let congregacion = req.params.congregacion;
    let month=req.query.month;
    let year=req.query.year;
    /* Informes.find({}).populate({path:'hermano',populate:{path:'familia', match:{ congregacion:congregacion}}})
    .where('hermano.familia').equals(null) */
    //Devuelve los informes de los hermanos de familias de una congregacion
    Familias.find({congregacion:congregacion}).exec()
        .then(familias=>{
            var idsFamiliasCong=familias.map((familia)=>{return familia._id});
            Hermanos.find({familia: {$in: idsFamiliasCong}}).exec()
                .then(hermanosCong=>{
                    var idsHermanosCong=hermanosCong.map((hermano)=>{return hermano._id});
                    Informes.find({hermano: {$in: idsHermanosCong}, month, year})
                    .exec()
                    .then(informes => {
                        res.status(200).send({ informes }); 
                    })
                    .catch(error => {
                        res.status(500).send({ error, message: "Ocurrio un error al obtener los informes de la congregacion" })
                    })
                })
        })
    
    
}

function agregarInforme(req, res) {
    Informes.create(req.body).then(nuevoInforme => {
        res.status(200).send({ created: true, informe: nuevoInforme });
    })
    .catch(error => {
        res.status(500).send({ created: false, error, message: "Ha ocurrido un error al agregar el informe" });
    })
}

function actualizarDatosInforme(req, res) {
    let informeId = req.params.informeId;
    let update = req.body;
    Informes.findByIdAndUpdate(informeId, { $set: update }, { new: true }).exec()
        .then(informeActualizado => {
            res.status(200).send({ updated: true, informe: informeActualizado });
        })
        .catch(error => {
            res.status(500).send({ updated: false, error, message: 'Ocurrio un error cuando se intentaba actualizar el informe' });
        })
}

module.exports={
    agregarInforme,
    actualizarDatosInforme,
    obtenerInformes
}
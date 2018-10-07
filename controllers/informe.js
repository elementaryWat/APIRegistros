const Informes = require('../models/informe');
const Hermanos = require('../models/hermano');
const Familias = require('../models/familia');


function agregarInforme(req, res) {
    Informes.create(req.body).then(nuevoInforme => {
        res.status(200).send({ created: true, informe: nuevoInforme });
    })
    .catch(error => {
        res.status(500).send({ created: false, error, message: "Ha ocurrido un error al agregar el informe" });
    })
}

function obtenerInformes(req, res) {
    let congregacion = req.params.congregacion;
    /* Informes.find({}).populate({path:'hermano',populate:{path:'familia', match:{ congregacion:congregacion}}})
    .where('hermano.familia').equals(null) */
    //Devuelve los informes de los hermanos de familias de una congregacion
    Familias.find({congregacion:congregacion}).exec()
        .then(familias=>{
            var idsFamiliasCong=familias.map((familia)=>{return familia._id});
            Hermanos.find({familia: {$in: idsFamiliasCong}}).exec()
                .then(hermanosCong=>{
                    var idsHermanosCong=hermanosCong.map((hermano)=>{return hermano._id});
                    Informes.find({hermano: {$in: idsHermanosCong}})
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

module.exports={
    agregarInforme,
    obtenerInformes
}
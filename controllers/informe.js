const Informes = require('../models/informe');

function agregarInforme(req, res) {
    Hermanos.create(req.body).then(nuevoInforme => {
        res.status(200).send({ created: true, informe: nuevoInforme });
    })
    .catch(error => {
        res.status(500).send({ created: false, error, message: "Ha ocurrido un error al agregar el informe" });
    })
}

function obtenerInformes(req, res) {
    let congregacion = req.params.congregacion;
    Informes.find({ congregacion: congregacion }).exec()
        .then(informes => {
            res.status(200).send({ informes });
        })
        .catch(error => {
            res.status(500).send({ error, message: "Ocurrio un error al obtener los informes de la congregacion" })
        })
}

module.exports={
    agregarInforme,
    obtenerInformes
}
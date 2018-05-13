const Hermanos = require('../models/hermano');
const Familias = require('../models/familia');

function agregarHermano(req, res) {
    Hermanos.create({
        nombre: req.body.nombre,
        familia: req.body.familia,
        genero: req.body.genero,
        domicilio: req.body.domicilio,
        grupo: req.body.grupo,
        telefono: req.body.telefono,
        celular: req.body.celular,
        fechaNacimiento: req.body.fechaNacimiento,
        bautizado: req.body.bautizado,
        fechaBautismo: req.body.fechaBautismo,
        ungido: req.body.ungido,
        siervoMinisterial: req.body.siervoMinisterial,
        anciano: req.body.anciano,
        precReg: req.body.precReg,
        idPrecursor: req.body.idPrecursor,
        fechaNombramientoPrecursor: req.body.fechaNombramientoPrecursor,
        }).then(nuevoHermano => {
            res.status(200).send({ created: true, hermano: nuevoHermano });
        })
        .catch(error => {
            res.status(500).send({ created: false, error, message: "Ha ocurrido un error al agregar al hermano" });
        })
}

function actualizarDatosHermano(req, res) {
    let hermanoId = req.params.hermanoId;
    let update = req.body;
    Hermanos.findByIdAndUpdate(hermanoId, { $set:update }, { new: true }).exec()
        .then(hermanoActualizado => {
            res.status(200).send({ updated: true, hermano: hermanoActualizado });
        })
        .catch(error => {
            res.status(500).send({ updated: false, error, message: 'Ocurrio un error cuando se intentaba actualizar los datos del hermano' });
        })
}

function editarFamilia(req, res) {  
    
}

function obtenerFamilias(req, res) {
    let congregacion = req.params.congregacion;
    Familias.find({ congregacion: congregacion }).exec()
        .then(familias => {
            res.status(200).send({ familias });
        })
        .catch(error => {
            res.status(500).send({ error, message: "Ocurrio un error al obtener las familias de la congregacion" })
        })
}
function obtenerHermanosFamilia(req, res) {
    let familia = req.params.familia;
    Hermanos.find({ familia: familia }).sort("fechaNacimiento").exec()
        .then(hermanos => {
            res.status(200).send({ hermanos });
        })
        .catch(error => {
            res.status(500).send({ error, message: "Ocurrio un error al obtener los hermanos de la familia" })
        })
}

function agregarFamilia(req, res) {
    Familias.create({
        apellido: req.body.apellido,
        congregacion: req.body.congregacion
    }).then(nuevaFamilia => {
        res.status(200).send({ created: true, familia: nuevaFamilia });
    })
        .catch(error => {
            res.status(500).send({ created: false, error, message: "Ha ocurrido un error al agregar la familia" })
        })
}

module.exports = {
    agregarHermano,
    actualizarDatosHermano,
    obtenerFamilias,
    obtenerHermanosFamilia,
    agregarFamilia
}
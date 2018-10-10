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
        datosContacto: req.body.datosContacto,
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
    Hermanos.findByIdAndUpdate(hermanoId, { $set: update }, { new: true }).exec()
        .then(hermanoActualizado => {
            res.status(200).send({ updated: true, hermano: hermanoActualizado });
        })
        .catch(error => {
            res.status(500).send({ updated: false, error, message: 'Ocurrio un error cuando se intentaba actualizar los datos del hermano' });
        })
}

function obtenerFamilias(req, res) {
    let congregacion = req.params.congregacion;
    Familias.find({ congregacion: congregacion }).sort('apellido').exec()
        .then(familias => {
            res.status(200).send({ familias });
        })
        .catch(error => {
            res.status(500).send({ error, message: "Ocurrio un error al obtener las familias de la congregacion" })
        })
}
function obtenerHermanosFamilia(req, res) {
    console.log(req.body);    
    let familia = req.params.familia;
    let tipo = req.body.tipo;
    let queryTipo={familia};
    switch (tipo) {
        case 'siervosministeriales':
            queryTipo = { familia: familia, siervoMinisterial: true };
            break;
        case 'ancianos':
            queryTipo = { familia: familia, anciano: true };
            break;
        case 'precursores':
            queryTipo = { familia: familia, precReg: true };
            break;
    }
    Hermanos.find(queryTipo).sort('fechaNacimiento').exec()
        .then(hermanos => {
            res.status(200).send({ hermanos });
        })
        .catch(error => {
            res.status(500).send({ error, message: "Ocurrio un error al obtener los hermanos de la familia" })
        })
}

function agregarFamilia(req, res) {
    Familias.create(req.body).then(nuevaFamilia => {
        res.status(200).send({ created: true, familia: nuevaFamilia });
    })
        .catch(error => {
            res.status(500).send({ created: false, error, message: "Ha ocurrido un error al agregar la familia" })
        })
}
function editarFamilia(req, res) {
    console.log(req.body);
    let update = req.body;
    let familiaId = req.params.familiaId;
    Familias.findByIdAndUpdate(familiaId, { $set: update }, { new: true }).then(familiaActualizada => {
        res.status(200).send({ updated: true, familia: familiaActualizada });
    })
        .catch(error => {
            res.status(500).send({ update: false, error, message: "Ha ocurrido un error al actualizar la familia" })
        })
}

function existeIntegranteEnFamilia(req, res) {
    let integrante = req.body;
    console.log(integrante);
    Hermanos.find(integrante).exec().then(hermanos => {
        if (hermanos.length > 0) {
            res.status(200).send({ founded: true });
        } else {
            res.status(200).send({ founded: false });
        }
    })
        .catch(error => {
            res.status(500).send({ founded: false, error, message: "Ha ocurrido un error al buscar los hermanos" })
        })
}

function existeFamilia(req, res) {
    let familia = req.body;
    Familias.find(familia).exec().then(familias => {
        if (familias.length > 0) {
            res.status(200).send({ founded: true });
        } else {
            res.status(200).send({ founded: false });
        }
    })
        .catch(error => {
            res.status(500).send({ founded: false, error, message: "Ha ocurrido un error al buscar las familias" })
        })
}

module.exports = {
    agregarHermano,
    actualizarDatosHermano,
    obtenerFamilias,
    obtenerHermanosFamilia,
    agregarFamilia,
    editarFamilia,
    existeFamilia,
    existeIntegranteEnFamilia
}
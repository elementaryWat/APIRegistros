const Users = require('../models/user');
const Congregacion = require('../models/congregacion');

const bcrypt = require("bcrypt");

function registrarUsuario(req, res) {
    var nuevoUser = new Users();
    nuevoUser.email = req.body.email;
    nuevoUser.role = req.body.role;
    nuevoUser.grupo = req.body.grupo;
    nuevoUser.congregacion = req.body.congregacion;
    bcrypt.hash(req.body.password, 10)
        .then(passHashed => {
            nuevoUser.password = passHashed;
            nuevoUser.save()
                .then(user => {
                    res.status(200).send({ created: true, user });
                })
                .catch(error => {
                    res.status(500).send({ created: false, error, message: "Ocurrio un error al agregar el usuario a la base de datos" })
                })
        })
        .catch(error => {
            res.status(500).send({ created: false, error, message: "Ocurrio un error al encriptar la password" })
        })
}
function registrarCongregacion(req, res) {
    var nuevaCongregacion = new Congregacion();
    nuevaCongregacion.nombre = req.body.nombre;
    nuevaCongregacion.direccion = req.body.direccion;
    nuevaCongregacion.save()
        .then(congregacion => {
            res.status(200).send({ created: true, congregacion })
        })
        .catch(error => {
            res.status(500).send({ created: false, error, message: "Ocurrio un error al agregar la congregacion a la base de datos" })
        })
}
function loginUsuario(req, res) {
    Users.findOne({ email: req.body.email }).exec()
        .then(userConEmail => {
            if (userConEmail) {
                bcrypt.compare(req.body.password,userConEmail.password)
                .then(equal=>{
                    if(equal){
                        res.status(200).send({logged:true,userConEmail});
                    }else{
                        res.status(404).send({logged:false});
                    }
                })
            }else{
                res.status(404).send({logged:false});
            }
        })
        .catch(error => {
            res.status(500).send({ error, message: "Ha ocurrido un error al loguear al usuario" })
        })
}
module.exports = {
    registrarUsuario,
    loginUsuario,
    registrarCongregacion
}
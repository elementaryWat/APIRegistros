const informeRouter=require("express").Router();
const mwAuthenticated=require('../middlewares/authenticated');
const informeController=require('../controllers/informe');

informeController.post('/',mwAuthenticated.ensureAuth,informeController.agregarInforme);
informeController.get('/listaInformes/:congregacion',mwAuthenticated.ensureAuth,informeController.obtenerInformes);

module.exports=informeRouter;   
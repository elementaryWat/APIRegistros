const informeRouter=require("express").Router();
const mwAuthenticated=require('../middlewares/authenticated');
const informeController=require('../controllers/informe');

informeRouter.post('/',mwAuthenticated.ensureAuth,informeController.agregarInforme);
informeRouter.get('/listaInformes/:congregacion',mwAuthenticated.ensureAuth,informeController.obtenerInformes);

module.exports=informeRouter;   
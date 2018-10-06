const hermanoRouter=require("express").Router();
const mwAuthenticated=require('../middlewares/authenticated');
const hermanoController=require('../controllers/hermano');

hermanoRouter.post('/',mwAuthenticated.ensureAuth,hermanoController.agregarHermano);
hermanoRouter.put('/:hermanoId',mwAuthenticated.ensureAuth,hermanoController.actualizarDatosHermano);
hermanoRouter.get('/listaFamilias/:congregacion',mwAuthenticated.ensureAuth,hermanoController.obtenerFamilias);
hermanoRouter.post('/listaHermanos/:familia',mwAuthenticated.ensureAuth,hermanoController.obtenerHermanosFamilia);
hermanoRouter.post('/actualizar',mwAuthenticated.ensureAuth,hermanoController.actualizarDatosHermano);
hermanoRouter.post('/agregarFamilia',mwAuthenticated.ensureAuth,hermanoController.agregarFamilia);
hermanoRouter.put('/editarFamilia/:familiaId',mwAuthenticated.ensureAuth,hermanoController.editarFamilia);
hermanoRouter.post('/existeFamilia',mwAuthenticated.ensureAuth,hermanoController.existeFamilia);
hermanoRouter.post('/existeIntegranteFamilia',mwAuthenticated.ensureAuth,hermanoController.existeIntegranteEnFamilia);

module.exports=hermanoRouter;   
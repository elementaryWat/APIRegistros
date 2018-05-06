const hermanoRouter=require("express").Router();
const mwAuthenticated=require('../middlewares/authenticated');
const hermanoController=require('../controllers/hermano');

hermanoRouter.post('/agregar',mwAuthenticated.ensureAuth,hermanoController.agregarHermano);
hermanoRouter.post('/actualizar',mwAuthenticated.ensureAuth,hermanoController.actualizarDatosHermano);
hermanoRouter.post('/agregarFamilia',mwAuthenticated.ensureAuth,hermanoController.agregarFamilia);

module.exports=hermanoRouter;
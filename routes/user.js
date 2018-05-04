const usersRouter=require("express").Router();
const usersController=require("../controllers/user");

usersRouter.post("/registrar",usersController.registrarUsuario)
usersRouter.post("/login",usersController.loginUsuario)
usersRouter.post("/registrarCongregacion",usersController.registrarCongregacion)

module.exports=usersRouter;